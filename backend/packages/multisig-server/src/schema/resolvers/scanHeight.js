const {
  multisig: { getMultisigDb },
} = require("@statescan/mongo");

async function scanHeight() {
  const db = await getMultisigDb();
  return db.getScanHeight();
}

module.exports = {
  scanHeight,
};
