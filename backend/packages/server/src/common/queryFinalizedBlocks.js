const {
  block: { getBlockCollection },
} = require("@statescan/mongo");

async function queryFinalizedBlocks(page, pageSize) {
  const col = await getBlockCollection();
  const blocks = await col
    .find({}, { projection: { digest: 0, _id: 0 } })
    .sort({ height: -1 })
    .skip(page * pageSize)
    .limit(pageSize)
    .toArray();
  return blocks.map((block) => ({
    ...block,
    isFinalized: true,
  }));
}

module.exports = {
  queryFinalizedBlocks,
};
