const { getActiveAssetOrThrow } = require("./getAsset");
const { getAssetHolderCol } = require("../asset");

async function deleteHolders(assetId, blockHeight) {
  const asset = await getActiveAssetOrThrow(assetId, blockHeight);
  const col = await getAssetHolderCol();
  await col.deleteMany({
    assetId,
    assetHeight: asset.assetHeight,
  });
}

module.exports = {
  deleteHolders,
};
