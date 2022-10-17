const { insertAssetTimeline } = require("../../mongo/assets/insertTimeline");
const { updateActiveAsset } = require("../../mongo/assets/updateAsset");

async function handleMetadataCleared(event, indexer) {
  const { method, data } = event;
  const assetId = data[0].toNumber();

  await updateActiveAsset(assetId, { metadata: null });
  await insertAssetTimeline(
    {
      assetId,
      name: method,
      args: {},
    },
    indexer,
  );
}

module.exports = {
  handleMetadataCleared,
};
