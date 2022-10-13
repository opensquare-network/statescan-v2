const { getLatestBlocks, setLatestBlocks } = require("../store");
const util = require("util");
const {
  queryUnFinalizedBlocks,
} = require("../../features/unfinalized/controllers/blocks");
const {
  latestBlocksRoom,
  feedInterval,
  latestBlocksKey,
} = require("../consts");
const omit = require("lodash.omit");
const { queryFinalizedBlocks } = require("../../common/queryFinalizedBlocks");

function normalizeBlock(block, isFinalized = true) {
  return {
    ...omit(block, ["extrinsicsRoot", "hash", "parentHash", "stateRoot"]),
    isFinalized,
  };
}

async function feedLatestBlocks(io) {
  try {
    const oldData = await getLatestBlocks();
    const unFinalizedBlocks = await queryUnFinalizedBlocks();
    const finalizedBlocks = await queryFinalizedBlocks(0, 5);
    const blocks = [
      ...unFinalizedBlocks.map((item) => normalizeBlock(item, false)),
      ...finalizedBlocks.map((item) => normalizeBlock(item, true)),
    ].slice(0, 5);

    if (util.isDeepStrictEqual(oldData, blocks)) {
      return;
    }

    setLatestBlocks(blocks);
    io.to(latestBlocksRoom).emit(latestBlocksKey, blocks);
  } catch (e) {
    console.error("feed latest blocks error:", e);
  } finally {
    setTimeout(feedLatestBlocks.bind(null, io), feedInterval);
  }
}

module.exports = {
  feedLatestBlocks,
};
