const {
  identity: { getRegistrarsCol },
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

module.exports = {
  batchInsertRegistrars,
};
