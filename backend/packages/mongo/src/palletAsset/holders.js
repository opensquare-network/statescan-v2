const { getActiveAssetOrThrow } = require("./getAsset");
const { getHolderCol } = require("./db");

async function deleteHolders(assetId, blockHeight) {
  const asset = await getActiveAssetOrThrow(assetId, blockHeight);
  const col = await getHolderCol();
  await col.deleteMany({
    assetId,
    assetHeight: asset.assetHeight,
  });
}

module.exports = {
  deleteHolders,
};
