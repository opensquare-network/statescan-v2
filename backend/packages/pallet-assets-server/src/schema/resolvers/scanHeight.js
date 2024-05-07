const {
  palletAsset: { getAssetDb },
} = require("@statescan/mongo");

async function scanHeight() {
  const db = await getAssetDb();
  return await db.getScanHeight();
}

module.exports = {
  scanHeight,
};
