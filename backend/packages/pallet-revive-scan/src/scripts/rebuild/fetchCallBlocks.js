const fs = require("fs");
const path = require("path");

// Read the .env of the package, so the script works from any directory.
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const { resolveNetwork } = require("../networks");

// Collect the block heights of the contract deployments and calls from the subscan open
// api and merge them into the block list the rebuild script scans, so that a scan covers
// the deployments as well as the calls.
//
// The heights are block numbers, so sorting them ascending sorts them by time.
const SUBSCAN_API_KEY = process.env.SUBSCAN_API_KEY || "";
// The open api rejects a bigger row.
const API_ROW = parseInt(process.env.SUBSCAN_API_ROW) || 25;
// 0 walks every page, a positive value only the newest ones, handy to try it out.
const API_MAX_PAGES = parseInt(process.env.SUBSCAN_API_MAX_PAGES) || 0;
// The walk over every revive extrinsic takes one request per page and a long while, it
// is opt in. The eth_transact blocks are always collected.
const WITH_CALL_BLOCKS = parseInt(process.env.WITH_CALL_BLOCKS) === 1;
// The call the plain block list was missing, asked for on its own with the call filter.
const ETH_TRANSACT_CALL = "eth_transact";

const REQUEST_TIMEOUT = 30000;
const RETRY_ATTEMPTS = 4;

// Set from the network the run is made for, see main().
let apiHost = "";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function withRetry(fn, attempts = RETRY_ATTEMPTS) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await fn();
    } catch (e) {
      lastError = e;
      if (attempt < attempts) {
        console.warn(`  request failed (${e.message}), retrying`);
        await sleep(1000 * attempt);
      }
    }
  }

  throw lastError;
}

async function requestApi(pathname, body) {
  if (!SUBSCAN_API_KEY) {
    throw new Error("SUBSCAN_API_KEY not set");
  }

  const response = await fetch(`${apiHost}${pathname}`, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "x-api-key": SUBSCAN_API_KEY,
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT),
  });
  if (!response.ok) {
    throw new Error(`${pathname} responded ${response.status}`);
  }

  const json = await response.json();
  if (json.code !== 0) {
    throw new Error(`${pathname} responded ${json.code}: ${json.message}`);
  }

  return json.data || {};
}

// An event is indexed by "<block height>-<event index>", an extrinsic by
// "<block height>-<extrinsic index>".
function parseIndexedHeight(indexedId) {
  const height = parseInt(String(indexedId || "").split("-")[0]);
  return Number.isInteger(height) && height > 0 ? height : null;
}

function loadBlockHeights(file) {
  if (!fs.existsSync(file)) {
    console.warn(`No block list at ${file}, starting from an empty one`);
    return new Set();
  }

  const blockHeights = JSON.parse(fs.readFileSync(file, "utf8"));
  if (!Array.isArray(blockHeights)) {
    throw new Error(`${file} does not hold an array of block heights`);
  }

  return new Set(blockHeights.map((height) => parseInt(height)));
}

// Sorted ascending, which is the order the blocks were produced in.
function saveBlockHeights(file, blockHeights) {
  const heights = [...blockHeights].sort((a, b) => a - b);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, `${JSON.stringify(heights, null, 2)}\n`);
  return heights;
}

// Every deployment emits a `revive.Instantiated` event, whose index carries the block
// the contract was deployed in.
async function collectCreationBlocks(blockHeights) {
  console.log("revive.Instantiated events:");

  let page = 0;
  let count = 0;
  let fetched = 0;
  let added = 0;
  let finished = false;
  while (!finished) {
    const data = await withRetry(() =>
      requestApi("/api/v2/scan/events", {
        module: "revive",
        event_id: "Instantiated",
        row: API_ROW,
        page,
      }),
    );

    const events = data.events || [];
    if (events.length <= 0) {
      break;
    }

    count = data.count || count;
    for (const event of events) {
      const height = parseIndexedHeight(event.event_index);
      if (height && !blockHeights.has(height)) {
        blockHeights.add(height);
        added++;
      }
    }

    fetched += events.length;
    page++;
    finished =
      (count > 0 && fetched >= count) ||
      (API_MAX_PAGES > 0 && page >= API_MAX_PAGES);
    console.log(
      `  page ${page}/${Math.ceil(
        count / API_ROW,
      )}, ${fetched}/${count} events, ${added} new blocks`,
    );
  }

  return { count, fetched, added };
}

// The blocks of the revive calls, read from the extrinsics of the pallet. The open api
// rejects paging beyond 10000 items and asks for the `after_id` cursor instead.
// A call filter narrows the walk down to one call of the pallet, e.g. `eth_transact`,
// which is the one the block list built from the plain pages was missing.
async function collectExtrinsicBlocks(blockHeights, { label, call = null }) {
  console.log(`${label}:`);

  let page = 0;
  let count = 0;
  let fetched = 0;
  let added = 0;
  let afterId = null;
  let finished = false;
  while (!finished) {
    const body = { module: "revive", row: API_ROW };
    if (call) {
      body.call = call;
    }
    if (afterId) {
      body.after_id = afterId;
    } else {
      body.page = 0;
    }

    const data = await withRetry(() =>
      requestApi("/api/v2/scan/extrinsics", body),
    );

    const extrinsics = data.extrinsics || [];
    if (extrinsics.length <= 0) {
      break;
    }

    count = data.count || count;
    for (const extrinsic of extrinsics) {
      const height =
        parseInt(extrinsic.block_num) ||
        parseIndexedHeight(extrinsic.extrinsic_index);
      if (height && !blockHeights.has(height)) {
        blockHeights.add(height);
        added++;
      }
    }

    fetched += extrinsics.length;
    page++;
    const nextAfterId = extrinsics[extrinsics.length - 1].id;
    finished =
      nextAfterId === afterId ||
      (count > 0 && fetched >= count) ||
      (API_MAX_PAGES > 0 && page >= API_MAX_PAGES);
    afterId = nextAfterId;
    console.log(
      `  page ${page}/${Math.ceil(
        count / API_ROW,
      )}, ${fetched}/${count} extrinsics, ${added} new blocks`,
    );
  }

  return { count, fetched, added };
}

// node src/scripts/rebuild/fetchCallBlocks.js [blocks file] [--network=<name>]
// The network picks the subscan host the heights are read from and the block list they
// are saved to, every chain has its own revive history. Without the argument the CHAIN of
// the .env decides, polkadot when it is not set.
function parseArgs(argv) {
  const network = argv.find((arg) => arg.startsWith("--network="));

  return {
    network: network ? network.slice("--network=".length) : null,
    blocksFile: argv.find((arg) => !arg.startsWith("--")),
  };
}

async function main() {
  const { network: networkArg, blocksFile: blocksFileArg } = parseArgs(
    process.argv.slice(2),
  );
  const network = resolveNetwork(networkArg);
  apiHost = process.env.SUBSCAN_API_HOST || network.subscanApiHost;
  const blocksFile = blocksFileArg
    ? path.resolve(blocksFileArg)
    : path.resolve(__dirname, network.blocksFile);

  const blockHeights = loadBlockHeights(blocksFile);
  console.log(`Loaded ${blockHeights.size} block heights from ${blocksFile}`);
  console.log(`Collecting the ${network.name} blocks from ${apiHost}`);

  const creation = await collectCreationBlocks(blockHeights);
  const heights = saveBlockHeights(blocksFile, blockHeights);
  console.log(
    `Saved ${heights.length} block heights (${heights[0]} - ${
      heights[heights.length - 1]
    }) to ${blocksFile}`,
  );

  const calls = WITH_CALL_BLOCKS
    ? await collectExtrinsicBlocks(blockHeights, { label: "revive extrinsics" })
    : await collectExtrinsicBlocks(blockHeights, {
        label: `revive.${ETH_TRANSACT_CALL} extrinsics`,
        call: ETH_TRANSACT_CALL,
      });
  const withCalls = saveBlockHeights(blocksFile, blockHeights);
  console.log(
    `Saved ${withCalls.length} block heights (${withCalls[0]} - ${
      withCalls[withCalls.length - 1]
    }) to ${blocksFile}`,
  );

  console.log("");
  console.log(
    `  deployments: ${creation.fetched}/${creation.count} events, ${creation.added} new blocks`,
  );
  console.log(
    `  ${WITH_CALL_BLOCKS ? "calls" : ETH_TRANSACT_CALL}: ${calls.fetched}/${
      calls.count
    } extrinsics, ${calls.added} new blocks`,
  );
  if (!WITH_CALL_BLOCKS) {
    console.log(
      "  other calls: skipped, set WITH_CALL_BLOCKS=1 to walk every revive extrinsic",
    );
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
