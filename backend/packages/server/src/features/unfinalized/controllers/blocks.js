const {
  block: { getUnFinalizedBlockCollection }
} = require("@statescan/mongo");

async function getUnFinalizedBlocks(ctx) {
  const col = await getUnFinalizedBlockCollection();
  const items = await col
    .find({}, { projection: { digest: 0, _id: 0 } })
    .sort({ "height": -1 })
    .toArray();

  ctx.body = {
    items,
  };
}

module.exports = {
  getUnFinalizedBlocks,
}
