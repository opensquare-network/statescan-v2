const {
  block: { getCallCollection }
} = require("@statescan/mongo");

async function getCall(ctx) {
  const { blockHeight, extrinsicIndex, callIndex } = ctx.params;
  const col = await getCallCollection();
  ctx.body = await col.findOne({
    "indexer.blockHeight": Number(blockHeight),
    "indexer.extrinsicIndex": Number(extrinsicIndex),
    "indexer.callIndex": Number(callIndex),
  }, { projection: { _id: 0 } });
}

module.exports = {
  getCall,
}
