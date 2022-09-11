const { deleteUnFinalizedLte } = require("../../mongo/services/unFinalized/delete");
const { batchUnFinalizedUpsertCalls } = require("../../mongo/services/unFinalized/call");
const { batchUpsertUnFinalizedExtrinsics } = require("../../mongo/services/unFinalized/extrinsic");
const { batchUnFinalizedUpsertEvents } = require("../../mongo/services/unFinalized/event");
const { upsertUnFinalizedBlock } = require("../../mongo/services/unFinalized/block");
const { extractCalls } = require("../call");
const { normalizeExtrinsics } = require("../extrinsic");
const { normalizeEvents } = require("../event");
const { normalizeBlock } = require("../block");
const {
  chain: {
    getLatestFinalizedHeight,
    getLatestUnFinalizedHeight,
    fetchBlocks,
  }
} = require("@osn/scan-common");

async function handleUnFinalizedBlock({ block, author, events, height }) {
  const blockIndexer = getBlockIndexer(block);

  const normalizedBlock = normalizeBlock(block, author, events, blockIndexer);
  const normalizedEvents = normalizeEvents(events, blockIndexer);
  const normalizedExtrinsics = normalizeExtrinsics(block.extrinsics, events, blockIndexer);
  const normalizedCalls = await extractCalls(block.extrinsics, events, blockIndexer);

  await upsertUnFinalizedBlock(normalizedBlock);
  await batchUnFinalizedUpsertEvents(normalizedEvents);
  await batchUpsertUnFinalizedExtrinsics(normalizedExtrinsics);
  await batchUnFinalizedUpsertCalls(normalizedCalls);
}

async function updateUnFinalized(newFinalizedHeight) {
  await deleteUnFinalizedLte(newFinalizedHeight);
  const finalizedHeight = getLatestFinalizedHeight();
  const unFinalizedHeight = getLatestUnFinalizedHeight();

  if (finalizedHeight >= unFinalizedHeight) {
    return;
  }

  let heights = [];
  for (let i = finalizedHeight + 1; i <= unFinalizedHeight; i++) {
    heights.push(i);
  }

  const blocks = await fetchBlocks(heights, true);
  for (const block of blocks) {
    await handleUnFinalizedBlock(block);
  }
}

module.exports = {
  updateUnFinalized,
}
