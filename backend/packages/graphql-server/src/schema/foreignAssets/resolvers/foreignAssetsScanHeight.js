const {
  foreignAsset: { getForeignAssetDb },
} = require("@statescan/mongo");

async function foreignAssetsScanHeight() {
  const db = await getForeignAssetDb();
  return await db.getScanHeight();
}

module.exports = {
  foreignAssetsScanHeight,
};
