const { insertAssetTimeline } = require("../../../mongo/assets/insertTimeline");
const { updateAssetDetail } = require("./updateAssetDetail");

async function updateAsset(event, indexer, timelineArgs = {}) {
  const { method, data } = event;
  const assetId = data[0].toNumber();

  await updateAssetDetail(assetId, indexer);
  await insertAssetTimeline(
    {
      assetId,
      name: method,
      args: timelineArgs,
    },
    indexer,
  );
}

module.exports = {
  updateAsset,
};
