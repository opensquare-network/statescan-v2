const util = require("util");
const { firstPageBlocksRoom, firstPageBlocksKey, feedInterval } = require("../consts");
const { getBlocks } = require("../../features/blocks/controllers/blocks");
const { getFirstPageBlocks, setFirstPageBlocks } = require("../store");

async function feedFirstPageBlocks(io) {
  try {
    const oldData = await getFirstPageBlocks();
    const blocks = await getBlocks(25);
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
}
