const {
  identity: { getRegistrarsCol, getRegistrarsTimelineCol, getRegistrarStatCol },
} = require("@statescan/mongo");
const {
  utils: { bigAdd },
} = require("@osn/scan-common");
const BigNumber = require("bignumber.js");

async function batchInsertRegistrars(registrars = []) {
  if (registrars.length <= 0) {
    return;
  }

  const col = await getRegistrarsCol();
  const bulk = await col.initializeOrderedBulkOp();
  bulk.find({}).delete();
  let index = 0;
  for (const registrar of registrars) {
    bulk.insert({
      index,
      ...registrar,
    });

    index++;
  }

  await bulk.execute();
}

async function insertRegistrarTimeline(obj = {}) {
  const collection = await getRegistrarsTimelineCol();
  await collection.insertOne(obj);
}

async function incRegistrarStats(registrarIndex, key, amount, indexer) {
  if (new BigNumber(amount).lte(0)) {
    return;
  }

  const col = await getRegistrarStatCol();
  const registrar = await col.findOne({ index: registrarIndex });
  const value = bigAdd((registrar && registrar[key]) || 0, amount);
  await col.findOneAndUpdate(
    { index: registrarIndex },
    { $set: { [key]: value } },
    { upsert: true },
  );
}

module.exports = {
  batchInsertRegistrars,
  insertRegistrarTimeline,
  incRegistrarStats,
};
