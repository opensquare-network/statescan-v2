const {
  palletAsset: { getHolderCol },
} = require("@statescan/mongo");

async function getHoldersCountByAssetId(assetId, assetHeight) {
  const col = await getHolderCol();
  return await col.count({ assetId, assetHeight });
}

module.exports = {
  getHoldersCountByAssetId,
};
