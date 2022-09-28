const {
  block: { getUnFinalizedBlockCollection },
} = require("@statescan/mongo");

async function queryUnFinalizedBlocks() {
  const col = await getUnFinalizedBlockCollection();
  return await col
    .find({}, { projection: { digest: 0, _id: 0 } })
    .sort({ height: -1 })
    .toArray();
}

async function getUnFinalizedBlocks(ctx) {
  ctx.body = {
    items: await queryUnFinalizedBlocks(),
  };
}

module.exports = {
  getUnFinalizedBlocks,
  queryUnFinalizedBlocks,
};
