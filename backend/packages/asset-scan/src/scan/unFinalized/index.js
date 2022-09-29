const { handleUnFinalizedBlock } = require("./block");
const { deleteUnFinalizedFrom } = require("./db");
const {
  chain: { getLatestFinalizedHeight, getLatestUnFinalizedHeight, fetchBlocks },
} = require("@osn/scan-common");

async function updateUnFinalized(newFinalizedHeight) {
  await deleteUnFinalizedFrom(newFinalizedHeight);
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
};
