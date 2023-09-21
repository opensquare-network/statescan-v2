const { getAddressCol } = require("../db");

// called when a new multisig is detected
async function upsertMultiAccount(
  address,
  threshold,
  allSignatories = [],
  indexer,
) {
  const col = await getAddressCol();
  const maybeInDb = await col.findOne({ address });
  if (maybeInDb) {
    await col.updateOne({ address }, { $set: { latestMultisigAt: indexer } });
    return;
  }

  await col.insertOne({
    address,
    threshold,
    allSignatories,
    allSignatoriesCount: allSignatories.length,
    debutAt: indexer,
    latestMultisigAt: indexer,
  });
}

module.exports = {
  upsertMultiAccount,
};
