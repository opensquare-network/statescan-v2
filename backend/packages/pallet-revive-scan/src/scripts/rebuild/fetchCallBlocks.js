const fs = require("fs");
const path = require("path");

// Read the .env of the package, so the script works from any directory.
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

// Collect the block heights of the contract deployments from the subscan open api and
// merge them into the block list the rebuild script scans, so that a scan covers the
// deployments as well as the calls.
//
// The heights are block numbers, so sorting them ascending sorts them by time.
const SUBSCAN_API_HOST =
  process.env.SUBSCAN_API_HOST || "https://assethub-polkadot.api.subscan.io";
const SUBSCAN_API_KEY = process.env.SUBSCAN_API_KEY || "";
// The open api rejects a bigger row.
const API_ROW = parseInt(process.env.SUBSCAN_API_ROW) || 25;
// 0 walks every page, a positive value only the newest ones, handy to try it out.
const API_MAX_PAGES = parseInt(process.env.SUBSCAN_API_MAX_PAGES) || 0;
// The call blocks take one request per page and a long while, they are opt in.
const WITH_CALL_BLOCKS = parseInt(process.env.WITH_CALL_BLOCKS) === 1;
const DEFAULT_BLOCKS_FILE = path.resolve(__dirname, "call-blocks.json");

const REQUEST_TIMEOUT = 30000;
const RETRY_ATTEMPTS = 4;

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

  const response = await fetch(`${SUBSCAN_API_HOST}${pathname}`, {
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
async function collectCallBlocks(blockHeights) {
  console.log("revive extrinsics:");

  let page = 0;
  let count = 0;
  let fetched = 0;
  let added = 0;
  let afterId = null;
  let finished = false;
  while (!finished) {
    const body = { module: "revive", row: API_ROW };
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

async function main() {
  const blocksFile = process.argv[2]
    ? path.resolve(process.argv[2])
    : DEFAULT_BLOCKS_FILE;

  const blockHeights = loadBlockHeights(blocksFile);
  console.log(`Loaded ${blockHeights.size} block heights from ${blocksFile}`);

  const creation = await collectCreationBlocks(blockHeights);
  const heights = saveBlockHeights(blocksFile, blockHeights);
  console.log(
    `Saved ${heights.length} block heights (${heights[0]} - ${
      heights[heights.length - 1]
    }) to ${blocksFile}`,
  );

  let calls = null;
  if (WITH_CALL_BLOCKS) {
    calls = await collectCallBlocks(blockHeights);
    const withCalls = saveBlockHeights(blocksFile, blockHeights);
    console.log(
      `Saved ${withCalls.length} block heights (${withCalls[0]} - ${
        withCalls[withCalls.length - 1]
      }) to ${blocksFile}`,
    );
  }

  console.log("");
  console.log(
    `  deployments: ${creation.fetched}/${creation.count} events, ${creation.added} new blocks`,
  );
  if (calls) {
    console.log(
      `  calls: ${calls.fetched}/${calls.count} extrinsics, ${calls.added} new blocks`,
    );
  } else {
    console.log("  calls: skipped, set WITH_CALL_BLOCKS=1 to collect them too");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
