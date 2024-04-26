const { getAssetCol } = require("./db");

async function getActiveAsset(assetId) {
  const col = await getAssetCol();
  const q = { assetId, destroyed: false };
  return await col.findOne(q);
}

async function getActiveAssetOrThrow(assetId, blockHeight) {
  const col = await getAssetCol();
  const q = { assetId, destroyed: false };
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
