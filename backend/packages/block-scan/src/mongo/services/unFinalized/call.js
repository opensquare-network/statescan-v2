const { block: { getUnFinalizedCallCollection } } = require("@statescan/mongo");

async function batchUnFinalizedUpsertCalls(calls = []) {
  if (calls.length <= 0) {
    return
  }

  const col = await getUnFinalizedCallCollection();
  const bulk = col.initializeUnorderedBulkOp();
  for (const call of calls) {
    const { indexer } = call;
    bulk.find({
      'indexer.blockHeight': indexer.blockHeight,
      'indexer.extrinsicIndex': indexer.extrinsicIndex,
      'indexer.callIndex': indexer.callIndex,
    }).upsert().update({
      $set: {
        ...call
      }
    })
  }

  await bulk.execute();
}

module.exports = {
  batchUnFinalizedUpsertCalls,
}
