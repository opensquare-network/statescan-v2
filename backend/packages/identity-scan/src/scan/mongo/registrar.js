const {
  identity: { getRegistrarsCol, getRegistrarsTimelineCol },
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
      registrar,
    });

    index++;
  }

  await bulk.execute();
}

async function insertRegistrarTimeline(obj = {}) {
  const collection = await getRegistrarsTimelineCol();
  await collection.insertOne(obj);
}

async function incRegistrarStats(index, key, amount, indexer) {
  if (new BigNumber(amount).lte(0)) {
    return;
  }

  const col = await getRegistrarsCol();
  const registrar = await col.findOne({ index });
  if (!registrar) {
    throw new Error(
      `Can not find registrar ${index} when inc ${key} by ${amount} at ${indexer.blockHeight}`,
    );
  }

  let stat = registrar.stat;
  if (!stat) {
    stat = {
      [key]: amount,
    };
  } else {
    stat[key] = bigAdd(stat[key] || 0, amount);
  }

  await col.findOneAndUpdate({ index }, { $set: { stat } });
}

module.exports = {
  batchInsertRegistrars,
  insertRegistrarTimeline,
  incRegistrarStats,
};
