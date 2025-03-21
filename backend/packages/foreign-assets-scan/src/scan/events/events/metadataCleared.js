const { queryForeignAssetMetadata } = require("../../query/assets/metadata");
const {
  foreignAsset: { updateForeignAsset, insertForeignAssetTimeline },
} = require("@statescan/mongo");

async function handleMetadataCleared(event, indexer) {
  const { method, data } = event;
  const assetId = data[0].hash.toString();

  const metadata = await queryForeignAssetMetadata(indexer.blockHash, data[0]);
  await updateForeignAsset(assetId, { metadata });

  await insertForeignAssetTimeline(assetId, method, {}, indexer);
}

module.exports = {
  handleMetadataCleared,
};
