const {
  multisig: { getMultisigDb },
} = require("@statescan/mongo");

async function multisigScanHeight() {
  const db = await getMultisigDb();
  return db.getScanHeight();
}

module.exports = {
  multisigScanHeight,
};
