const {
  palletAsset: { insertPalletAssetTimeline, updateActiveAsset },
} = require("@statescan/mongo");

async function handleMetadataCleared(event, indexer) {
  const { method, data } = event;
  const assetId = data[0].toNumber();

  await updateActiveAsset(assetId, { metadata: null });
  await insertPalletAssetTimeline(assetId, method, {}, indexer);
}

module.exports = {
  handleMetadataCleared,
};
