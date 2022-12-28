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

module.exports = {
  batchInsertCalls,
};
