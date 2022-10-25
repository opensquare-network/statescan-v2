const {
  asset: { getAssetHolderCol },
} = require("@statescan/mongo");

async function getHoldersCountByAssetId(assetId, assetHeight) {
  const col = await getAssetHolderCol();
  return await col.count({ assetId, assetHeight });
}

module.exports = {
  getHoldersCountByAssetId,
};
