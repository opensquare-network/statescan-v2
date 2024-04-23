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
    const oldData = getLatestBlocks();
    const unFinalizedBlocks = await queryUnFinalizedBlocks();
    const finalizedBlocks = await queryFinalizedBlocks(0, 5);
    const latestFinalized = finalizedBlocks[0]?.height;
    const filteredUnFinalizedBlocks = unFinalizedBlocks.filter((b) => {
      if (latestFinalized) {
        return b.height > latestFinalized;
      }
      return false;
    });

    const blocks = [
      ...filteredUnFinalizedBlocks.map((item) => normalizeBlock(item, false)),
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
