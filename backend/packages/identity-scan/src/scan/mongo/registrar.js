const {
  identity: { getRegistrarsCol, getRegistrarsTimelineCol },
} = require("@statescan/mongo");

async function batchInsertRegistrars(registrars = []) {
  if (registrars.length <= 0) {
    return;
  }

  const col = await getRegistrarsCol();
  const bulk = await col.initializeOrderedBulkOp();
  bulk.find({}).delete();
  for (const registrar of registrars) {
    bulk.insert(registrar);
  }

  await bulk.execute();
}

async function insertRegistrarTimeline(obj = {}) {
  const collection = await getRegistrarsTimelineCol();
  await collection.insertOne(obj);
}

module.exports = {
  batchInsertRegistrars,
  insertRegistrarTimeline,
};
