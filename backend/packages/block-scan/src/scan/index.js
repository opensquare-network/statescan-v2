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
  },
  scan: {
    oneStepScan,
  },
  utils: {
    sleep,
  },
  mongo: {scan: {getNextScanHeight, updateScanHeight}}
} = require("@osn/scan-common");

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

  await updateScanHeight(height);
}

async function scan() {
  let toScanHeight = await getNextScanHeight();
  while (true) {
    toScanHeight = await oneStepScan(toScanHeight, handleBlock)
    await sleep(1);
  }
}

module.exports = {
  handleBlock,
  scan,
}
