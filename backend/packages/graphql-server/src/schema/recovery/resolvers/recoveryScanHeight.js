const {
  palletRecovery: { getRecoveryDb },
} = require("@statescan/mongo");

async function recoveryScanHeight() {
  const db = await getRecoveryDb();
  return await db.getScanHeight();
}

module.exports = {
  recoveryScanHeight,
};
