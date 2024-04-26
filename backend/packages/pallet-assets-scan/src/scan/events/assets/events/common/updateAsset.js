const { updateAssetDetail } = require("./updateAssetDetail");
const {
  palletAsset: { insertPalletAssetTimeline },
} = require("@statescan/mongo");

async function updateAsset(event, indexer, timelineArgs = {}) {
  const { method, data } = event;
  const assetId = data[0].toNumber();

  await updateAssetDetail(assetId, indexer);
  await insertPalletAssetTimeline(assetId, method, timelineArgs, indexer);
}

module.exports = {
  updateAsset,
};
