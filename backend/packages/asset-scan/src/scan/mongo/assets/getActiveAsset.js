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

async function getActiveAssetOrThrow(assetId, blockHeight) {
  const col = await getAssetCol();
  const q = { assetId, module: AssetModule.assets, destroyed: false };
  const asset = await col.findOne(q);
  if (!asset) {
    throw new Error(
      `Can not find asset ${assetId} when update approval at ${blockHeight}`,
    );
  }

  return asset;
}

module.exports = {
  getActiveAsset,
  getActiveAssetOrThrow,
};
