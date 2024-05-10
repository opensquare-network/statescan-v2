const {
  palletAsset: { getAssetDb },
} = require("@statescan/mongo");

async function assetsPalletScanHeight() {
  const db = await getAssetDb();
  return await db.getScanHeight();
}

module.exports = {
  assetsPalletScanHeight,
};
