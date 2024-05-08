const {
  palletAsset: { getActiveAssets },
} = require("@statescan/mongo");

async function getHoldersWithAssets(holders) {
  const assets = await getActiveAssets();
  return (holders || []).map((holder) => {
    const asset = assets.find(
      (asset) =>
        asset.assetId === holder.assetId &&
        asset.assetHeight === holder.assetHeight,
    );
    return {
      ...holder,
      asset,
    };
  });
}

module.exports = {
  getHoldersWithAssets,
};
