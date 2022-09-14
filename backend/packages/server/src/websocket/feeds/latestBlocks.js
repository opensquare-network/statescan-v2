const { getLatestBlocks, setLatestBlocks } = require("../store");
const util = require("util");
const { getBlocks } = require("../../features/blocks/controllers/blocks");
const { latestBlocksRoom, feedInterval, latestBlocksKey } = require("../consts");

async function feedLatestBlocks(io) {
  try {
    const oldData = await getLatestBlocks();
    const blocks = await getBlocks(5);
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
}
