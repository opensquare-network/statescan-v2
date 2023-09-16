const { getAddressCol } = require("../db");

async function upsertMultiAccount(address, threshold, allSignatories = []) {
  const col = await getAddressCol();
  await col.updateOne(
    { address },
    {
      $set: {
        threshold,
        allSignatories,
        allSignatoriesCount: allSignatories.length,
      },
      $inc: { "statistics.multisig": 1 },
    },
    { upsert: true },
  );
}

module.exports = {
  upsertMultiAccount,
};
