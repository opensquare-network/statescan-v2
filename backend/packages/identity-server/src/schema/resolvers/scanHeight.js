const {
  identity: { getIdentityDb },
} = require("@statescan/mongo");

async function scanHeight() {
  const db = await getIdentityDb();
  return db.getScanHeight();
}

module.exports = {
  scanHeight,
};
