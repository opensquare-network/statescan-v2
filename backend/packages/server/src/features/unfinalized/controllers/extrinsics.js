const {
  block: { getUnFinalizedExtrinsicCollection }
} = require("@statescan/mongo");

async function getUnFinalizedExtrinsics(ctx) {
  const col = await getUnFinalizedExtrinsicCollection();
  const items = await col
    .find({}, { projection: { nonce: 0, _id: 0, tip: 0, signature: 0 } })
    .sort({ "indexer.blockHeight": -1, "indexer.extrinsicIndex": 1 })
    .toArray();

  ctx.body = {
    items,
  };
}

module.exports = {
  getUnFinalizedExtrinsics,
}
