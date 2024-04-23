const {
  deleteUnFinalizedLte,
} = require("../../mongo/services/unFinalized/delete");
const {
  batchUnFinalizedUpsertCalls,
} = require("../../mongo/services/unFinalized/call");
const {
  batchUpsertUnFinalizedExtrinsics,
} = require("../../mongo/services/unFinalized/extrinsic");
const {
  batchUnFinalizedUpsertEvents,
} = require("../../mongo/services/unFinalized/event");
const {
  upsertUnFinalizedBlock,
  getLatestUnFinalizedHeightInDb,
} = require("../../mongo/services/unFinalized/block");
const { normalizeExtrinsics } = require("../extrinsic");
const { normalizeEvents } = require("../event");
const { normalizeBlock } = require("../block");
const {
  chain: {
    getBlockIndexer,
    getLatestFinalizedHeight,
    getLatestUnFinalizedHeight,
    fetchBlocks,
  },
  logger,
} = require("@osn/scan-common");
const chunk = require("lodash.chunk");

async function handleUnFinalizedBlock({ block, author, events }) {
  const blockIndexer = getBlockIndexer(block);

  const normalizedBlock = normalizeBlock(block, author, events, blockIndexer);
  const normalizedEvents = normalizeEvents(events, blockIndexer);
  const { normalizedExtrinsics, normalizedCalls } = await normalizeExtrinsics(
    block.extrinsics,
    events,
    blockIndexer,
  );

  await upsertUnFinalizedBlock(normalizedBlock);
  await batchUnFinalizedUpsertEvents(normalizedEvents);
  await batchUpsertUnFinalizedExtrinsics(normalizedExtrinsics);
  await batchUnFinalizedUpsertCalls(normalizedCalls);
}

async function handleBlocks(heights) {
  const blocks = await fetchBlocks(heights, true);
  for (const block of blocks) {
    await handleUnFinalizedBlock(block);
  }
}

async function updateUnFinalized(newFinalizedHeight) {
  await deleteUnFinalizedLte(newFinalizedHeight);
  const finalizedHeight = getLatestFinalizedHeight();
  const unFinalizedHeight = getLatestUnFinalizedHeight();

  if (
    newFinalizedHeight > finalizedHeight ||
    newFinalizedHeight > unFinalizedHeight
  ) {
    return;
  }

  if (finalizedHeight >= unFinalizedHeight) {
    await deleteUnFinalizedLte(finalizedHeight);
    return;
  }

  const latestFinalizedInDb = await getLatestUnFinalizedHeightInDb();
  let start = finalizedHeight + 1;
  if (latestFinalizedInDb && latestFinalizedInDb > start) {
    start = latestFinalizedInDb;
  }

  let heights = [];
  for (let i = start; i <= unFinalizedHeight; i++) {
    heights.push(i);
  }

  const heightChunks = chunk(heights, 10);
  for (const chunkHeights of heightChunks) {
    if (chunkHeights.length <= 0) {
      continue;
    }
    await handleBlocks(chunkHeights);
    logger.info(
      `un-finalized block ${chunkHeights[chunkHeights.length - 1]} saved`,
    );
  }
}

module.exports = {
  updateUnFinalized,
};
