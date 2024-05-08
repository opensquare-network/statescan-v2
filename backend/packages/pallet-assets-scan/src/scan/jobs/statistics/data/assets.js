const {
  palletAsset: { getAssetCol },
} = require("@statescan/mongo");
const { getAssetDayTransferData } = require("./transfer");
const { getHoldersCountByAssetId } = require("./holder");

async function getActiveAssets() {
  const col = await getAssetCol();
  return await col
    .find({ destroyed: false }, { projection: { assetId: 1, assetHeight: 1 } })
    .toArray();
}

async function getAssetStatistic(assetId, assetHeight, indexer) {
  const { count: transferCount, amount: transferAmount } =
    await getAssetDayTransferData(assetId, assetHeight, indexer.blockTime);
  const holderCount = await getHoldersCountByAssetId(assetId, assetHeight);

  return {
    assetId,
    assetHeight,
    transferCount,
    transferAmount,
    holderCount,
    indexer,
  };
}

module.exports = {
  getActiveAssets,
  getAssetStatistic,
};
