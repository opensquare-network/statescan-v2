const {
  block: { getCallCollection, getUnFinalizedCallCollection }
} = require("@statescan/mongo");

async function findCall(col, q, isFinalized = true) {
  const call = await col.findOne(q, { projection: { _id: 0 } });
  return call ? { ...call, isFinalized } : call;
}

async function getCall(ctx) {
  const { blockHeight, extrinsicIndex, callIndex } = ctx.params;
  const q = {
    "indexer.blockHeight": Number(blockHeight),
    "indexer.extrinsicIndex": Number(extrinsicIndex),
    "indexer.callIndex": Number(callIndex),
  }

  let call = await findCall(await getCallCollection(), q);
  if (!call) {
    call = await findCall(await getUnFinalizedCallCollection(), q, false);
  }
  ctx.body = call;
}

module.exports = {
  getCall,
}
