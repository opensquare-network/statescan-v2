const { getAssetCol } = require("./db");

async function getForeignAsset(assetId) {
  const col = await getAssetCol();
  return await col.findOne({ assetId });
}

module.exports = {
  getForeignAsset,
};
