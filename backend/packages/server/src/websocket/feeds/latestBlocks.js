const { getLatestBlocks, setLatestBlocks } = require("../store");
const {
  block: {
    getBlockCollection,
    getUnFinalizedBlockCollection,
  }
} = require("@statescan/mongo");
const util = require("util");
const { latestBlocksRoom, feedInterval, latestBlocksKey } = require("../consts");

async function getColBlocks(col, page, pageSize, isFinalized = true) {
  const items = await col
    .find({}, { projection: { digest: 0, _id: 0 } })
    .sort({ "height": -1 })
    .skip(page * pageSize)
    .limit(pageSize)
    .toArray();

  return (items || []).map((item) => ({
    ...item,
    isFinalized,
  }));
}

async function getBlocks(n = 5) {
  const unFinalizedCol = await getUnFinalizedBlockCollection();
  const unFinalizedBlocks = await getColBlocks(unFinalizedCol, 0, 1000, false);

  const col = await getBlockCollection();
  const blocks = await getColBlocks(col, 0, 5, true);

  const finalizedHeightSet = new Set(blocks.map(b => b.height));
  const filteredUnFinalizedBlocks = unFinalizedBlocks.filter(b => !finalizedHeightSet.has(b.height))

  return [...filteredUnFinalizedBlocks, ...blocks];
}

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
