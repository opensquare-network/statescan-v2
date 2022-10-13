const util = require("util");
const { queryFinalizedBlocks } = require("../../common/queryFinalizedBlocks");
const {
  firstPageBlocksRoom,
  firstPageBlocksKey,
  feedInterval,
} = require("../consts");
const { getFirstPageBlocks, setFirstPageBlocks } = require("../store");

async function feedFirstPageBlocks(io) {
  try {
    const oldData = await getFirstPageBlocks();
    const blocks = await queryFinalizedBlocks(0, 25);
    if (util.isDeepStrictEqual(oldData, blocks)) {
      return;
    }

    setFirstPageBlocks(blocks);
    io.to(firstPageBlocksRoom).emit(firstPageBlocksKey, blocks);
  } catch (e) {
    console.error("feed latest blocks error:", e);
  } finally {
    setTimeout(feedFirstPageBlocks.bind(null, io), feedInterval);
  }
}

module.exports = {
  feedFirstPageBlocks,
};
