const path = require("path");

// Read the .env of the package, so the script works from any directory.
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const fs = require("fs");
const {
  chain: { fetchOneBlockFromNode, subscribeFinalizedHeight },
} = require("@osn/scan-common");
const { handleBlock } = require("../../scan");
const {
  palletRevive: {
    initPalletReviveScanDb,
    getReviveDb,
    getContractCol,
    getCallCol,
  },
  knownHeight: { initKnownHeightDb },
} = require("@statescan/mongo");

// Written by fetchCallBlocks.js in this directory, a JSON array of block heights
// sorted in ascending order.
const defaultBlocksFile = path.resolve(__dirname, "call-blocks.json");

const defaultConcurrency = 8;

// node src/scripts/rebuild/index.js [blocks file] [--fresh]
// [--after=<height>] [--concurrency=<n>]
// The list is always scanned in ascending block order, so the last handled block is the
// newest one and the normal scan continues right after it.
// --fresh ignores the stored progress and scans the list from its start again.
// --after starts after the given height, for the runs made before the progress was kept.
// --concurrency is the number of blocks fetched ahead, SCAN_CONCURRENCY is the default.
function parseArgs(argv) {
  const after = argv.find((arg) => arg.startsWith("--after="));
  const concurrency = argv.find((arg) => arg.startsWith("--concurrency="));

  return {
    blocksFile: argv.find((arg) => !arg.startsWith("--")),
    fresh: argv.includes("--fresh"),
    after: after ? parseInt(after.slice("--after=".length)) : null,
    concurrency: parseInt(
      concurrency
        ? concurrency.slice("--concurrency=".length)
        : process.env.SCAN_CONCURRENCY || defaultConcurrency,
    ),
  };
}

function checkConcurrency(concurrency) {
  if (!Number.isInteger(concurrency) || concurrency <= 0) {
    throw new Error(
      `Invalid concurrency ${concurrency}, it must be a positive integer`,
    );
  }
}

function getBlockHeights(file) {
  if (!fs.existsSync(file)) {
    throw new Error(
      `Block heights file ${file} not found, run src/scripts/rebuild/fetchCallBlocks.js first`,
    );
  }

  const blockHeights = JSON.parse(fs.readFileSync(file, "utf8"));
  if (!Array.isArray(blockHeights) || blockHeights.length <= 0) {
    throw new Error(`No block heights found in ${file}`);
  }

  return [...blockHeights].sort((a, b) => a - b);
}

async function countAtHeight(col, height) {
  return await col.countDocuments({ "indexer.blockHeight": height });
}

// A block is two rpc round trips away, fetching them one by one waits for the network
// most of the time. The next blocks are fetched while the current one is written, but
// only the fetching is concurrent: a block is always written before the next one, so
// the database sees the heights in the order of the list.
async function* fetchBlocksInOrder(heights, concurrency) {
  const pending = new Map();
  let next = 0;

  const fill = () => {
    while (pending.size < concurrency && next < heights.length) {
      const index = next++;
      const promise = fetchOneBlockFromNode(heights[index]);
      // A block fetched ahead can fail before it is awaited, and a rejection without a
      // handler ends the process. The error is still thrown when the block is awaited.
      promise.catch(() => {});
      pending.set(index, promise);
    }
  };

  for (let index = 0; index < heights.length; index++) {
    fill();

    const promise = pending.get(index);
    pending.delete(index);
    yield await promise;
  }
}

// Scanning the whole list takes a long while, so the height of the last handled block is
// kept in the database and a rerun goes on after it. The blocks file is part of the name,
// another file has another set of blocks.
function progressName(file) {
  return `rebuild-progress:${file}`;
}

async function getProgressHeight(statusCol, name) {
  const progress = await statusCol.findOne({ name });
  return progress && typeof progress.value === "number" ? progress.value : null;
}

async function saveProgressHeight(statusCol, name, height) {
  await statusCol.updateOne(
    { name },
    { $set: { value: height } },
    { upsert: true },
  );
}

function remainingBlockHeights(allHeights, lastScanned) {
  if (lastScanned === null) {
    return allHeights;
  }

  return allHeights.filter((height) => height > lastScanned);
}

(async () => {
  const { blocksFile, fresh, after, concurrency } = parseArgs(
    process.argv.slice(2),
  );
  checkConcurrency(concurrency);
  const file = blocksFile ? path.resolve(blocksFile) : defaultBlocksFile;
  const allHeights = getBlockHeights(file);

  await initPalletReviveScanDb();
  await initKnownHeightDb();
  await subscribeFinalizedHeight();

  const db = await getReviveDb();
  const statusCol = await db.getStatusCol();
  const name = progressName(file);

  if (fresh) {
    await statusCol.deleteOne({ name });
  }

  let lastScanned = null;
  if (!fresh) {
    lastScanned = Number.isInteger(after)
      ? after
      : await getProgressHeight(statusCol, name);
  }
  const blockHeights = remainingBlockHeights(allHeights, lastScanned);
  const skipped = allHeights.length - blockHeights.length;

  console.log(
    `Scanning ${blockHeights.length} of ${allHeights.length} blocks from ${file}, ` +
      "in ascending block order",
  );
  if (lastScanned !== null) {
    console.log(
      `Resuming after block ${lastScanned}, ${skipped} blocks already scanned`,
    );
  }

  if (blockHeights.length <= 0) {
    console.log("Nothing left to scan, use --fresh to scan the list again");
    process.exit(0);
  }

  const contractCol = await getContractCol();
  const callCol = await getCallCol();

  console.log(
    `Fetching up to ${concurrency} blocks ahead, the blocks are written in order`,
  );

  let index = 0;
  let contractCount = 0;
  let callCount = 0;
  for await (const block of fetchBlocksInOrder(blockHeights, concurrency)) {
    await handleBlock(block);
    await saveProgressHeight(statusCol, name, block.height);

    const [contracts, calls] = await Promise.all([
      countAtHeight(contractCol, block.height),
      countAtHeight(callCol, block.height),
    ]);
    contractCount += contracts;
    callCount += calls;

    index++;
    console.log(
      `${block.height} finished, ${skipped + index}/${
        allHeights.length
      }, contracts ${contracts}, calls ${calls}`,
    );
  }

  console.log(
    `finished, ${contractCount} contracts, ${callCount} calls indexed`,
  );
  process.exit(0);
})();
