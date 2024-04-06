const { handleUnFinalizedBlock } = require("./block");
const {
  deleteUnFinalizedLte,
  updateUnFinalizedHeight,
  getUnFinalizedScanHeight,
} = require("./db");
const {
  chain: { getLatestFinalizedHeight, getLatestUnFinalizedHeight, fetchBlocks },
  logger,
} = require("@osn/scan-common");
const chunk = require("lodash.chunk");

async function handleBlocks(heights) {
  const blocks = await fetchBlocks(heights, true);
  for (const block of blocks) {
    await handleUnFinalizedBlock(block);
    await updateUnFinalizedHeight(block.height);
  }
}

async function updateUnFinalized(newFinalizedHeight) {
  await deleteUnFinalizedLte(newFinalizedHeight);
  const finalizedHeight = getLatestFinalizedHeight();
  const unFinalizedHeight = getLatestUnFinalizedHeight();

  if (finalizedHeight >= unFinalizedHeight) {
    await deleteUnFinalizedLte(finalizedHeight);
    return;
  }

  const latestFinalizedInDb = await getUnFinalizedScanHeight();
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
    await handleBlocks(chunkHeights);
    logger.info(
      `un-finalized block ${chunkHeights[chunkHeights.length - 1]} saved`,
    );
  }
}

module.exports = {
  updateUnFinalized,
};
