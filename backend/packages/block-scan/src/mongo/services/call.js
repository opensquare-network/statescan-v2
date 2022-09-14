const {
  block: { getCallCollection },
} = require("@statescan/mongo");

async function batchInsertCalls(calls = []) {
  if (calls.length <= 0) {
    return;
  }

  const col = await getCallCollection();
  const bulk = col.initializeUnorderedBulkOp();
  for (const call of calls) {
    bulk.insert(call);
  }
  await bulk.execute();
}

async function batchUpsertCalls(calls = []) {
  if (calls.length <= 0) {
    return;
  }

  const col = await getCallCollection();
  const bulk = col.initializeUnorderedBulkOp();
  for (const call of calls) {
    const { indexer } = call;
    bulk
      .find({
        "indexer.blockHeight": indexer.blockHeight,
        "indexer.extrinsicIndex": indexer.extrinsicIndex,
        "indexer.callIndex": indexer.callIndex,
      })
      .upsert()
      .update({
        $set: {
          ...call,
        },
      });
  }

  await bulk.execute();
}

module.exports = {
  batchUpsertCalls,
  batchInsertCalls,
};
