const {
  asset: { getAssetCol },
} = require("@statescan/mongo");

async function getActiveAsset(assetId) {
  const col = await getAssetCol();
  const q = { assetId, destroyed: false };
  return await col.findOne(q);
}

module.exports = {
  getActiveAsset,
};
