const {
  block: { getUnFinalizedBlockCollection },
} = require("@statescan/mongo");

async function queryUnFinalizedBlocks() {
  const col = await getUnFinalizedBlockCollection();
  const blocks = await col
    .find({}, { projection: { digest: 0, _id: 0 } })
    .sort({ height: -1 })
    .toArray();
  return blocks.map((block) => ({
    ...block,
    isFinalized: false,
  }));
}

module.exports = {
  queryUnFinalizedBlocks,
};
