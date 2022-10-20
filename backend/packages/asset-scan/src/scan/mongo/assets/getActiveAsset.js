const {
  asset: { getAssetCol },
} = require("@statescan/mongo");
const {
  consts: { AssetModule },
} = require("@statescan/common");

async function getActiveAsset(assetId) {
  const col = await getAssetCol();
  const q = { assetId, module: AssetModule.assets, destroyed: false };
  return await col.findOne(q);
}

module.exports = {
  getActiveAsset,
};
