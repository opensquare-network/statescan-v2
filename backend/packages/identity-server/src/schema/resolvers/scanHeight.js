const {
  identity: { getIdentityDb },
} = require("@statescan/mongo");
const {
  env: { currentChain },
} = require("@osn/scan-common");

async function scanHeight() {
  const db = await getIdentityDb();
  if (["polkadot", "kusama"].includes(currentChain())) {
    const col = await db.getStatusCol();
    const heightInfo = await col.findOne({ name: "people-chain-scan-height" });
    return parseInt(heightInfo.value);
  }

  return db.getScanHeight();
}

module.exports = {
  scanHeight,
};
