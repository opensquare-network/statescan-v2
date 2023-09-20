const { getAddressCol } = require("../db");

async function upsertMultiAccount(
  address,
  threshold,
  allSignatories = [],
  indexer,
) {
  const col = await getAddressCol();
  const maybeInDb = await col.findOne({ address });
  if (maybeInDb) {
    return;
  }

  await col.insertOne({
    address,
    threshold,
    allSignatories,
    allSignatoriesCount: allSignatories.length,
    debutAt: indexer,
  });
}

module.exports = {
  upsertMultiAccount,
};
