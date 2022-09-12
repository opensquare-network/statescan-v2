const { updateUnFinalized } = require("./unFinalized");
const { batchUpsertCalls } = require("../mongo/services/call");
const { extractCalls } = require("./call");
const { batchUpsertExtrinsics } = require("../mongo/services/extrinsic");
const { batchUpsertEvents } = require("../mongo/services/event");
const { upsertBlock } = require("../mongo/services/block");
const { normalizeBlock } = require("./block");
const { normalizeEvents } = require("./event");
const { normalizeExtrinsics } = require("./extrinsic");
const {
  chain: {
    getBlockIndexer,
    getLatestFinalizedHeight,
  },
  scan: {
    oneStepScan,
  },
  utils: {
    sleep,
  },
} = require("@osn/scan-common");
const { block: { getBlockDb } } = require("@statescan/mongo");

async function handleBlock({ block, author, events, height }) {
  const blockIndexer = getBlockIndexer(block);

  const normalizedBlock = normalizeBlock(block, author, events, blockIndexer);
  const normalizedEvents = normalizeEvents(events, blockIndexer);
  const normalizedExtrinsics = normalizeExtrinsics(block.extrinsics, events, blockIndexer);
  const normalizedCalls = await extractCalls(block.extrinsics, events, blockIndexer);

  await upsertBlock(normalizedBlock);
  await batchUpsertEvents(normalizedEvents);
  await batchUpsertExtrinsics(normalizedExtrinsics);
  await batchUpsertCalls(normalizedCalls);

  const db = getBlockDb();
  await db.updateScanHeight(height);

  const finalizedHeight = getLatestFinalizedHeight();
  if (height >= finalizedHeight) {
    await updateUnFinalized(finalizedHeight);
  }
}

async function scan() {
  const db = getBlockDb();
  let toScanHeight = await db.getNextScanHeight();
  while (true) {
    toScanHeight = await oneStepScan(toScanHeight, handleBlock, true);
    await sleep(1);
  }
}

module.exports = {
  handleBlock,
  scan,
}
