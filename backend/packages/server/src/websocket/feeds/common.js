const {
  block: { getBlockCollection, getUnFinalizedBlockCollection },
} = require("@statescan/mongo");

async function getColBlocks(col, page, pageSize, isFinalized = true) {
  const items = await col
    .find({}, { projection: { digest: 0, _id: 0 } })
    .sort({ height: -1 })
    .skip(page * pageSize)
    .limit(pageSize)
    .toArray();

  return (items || []).map((item) => ({
    ...item,
    isFinalized,
  }));
}

async function getBlocks() {
  const unFinalizedCol = await getUnFinalizedBlockCollection();
  const unFinalizedBlocks = await getColBlocks(unFinalizedCol, 0, 1000, false);

  const col = await getBlockCollection();
  const blocks = await getColBlocks(col, 0, 5, true);

  const finalizedHeightSet = new Set(blocks.map((b) => b.height));
  const filteredUnFinalizedBlocks = unFinalizedBlocks.filter(
    (b) => !finalizedHeightSet.has(b.height),
  );

  return [...filteredUnFinalizedBlocks, ...blocks];
}

module.exports = {
  getBlocks,
};
