const { queryForeignAssetMetadata } = require("../../query/assets/metadata");
const {
  foreignAsset: { updateForeignAsset, insertForeignAssetTimeline },
} = require("@statescan/mongo");
const {
  utils: { chainFieldToString },
} = require("@statescan/common");

async function handleMetadataSet(event, indexer) {
  const { method, data } = event;
  const assetId = data[0].hash.toString();
  const metadata = await queryForeignAssetMetadata(indexer.blockHash, data[0]);
  await updateForeignAsset(assetId, { metadata });

  await insertForeignAssetTimeline(
    assetId,
    method,
    {
      name: chainFieldToString(data[1]),
      symbol: chainFieldToString(data[2]),
      decimals: data[3].toNumber(),
      isFrozen: data[4].toJSON(),
    },
    indexer,
  );
}

module.exports = {
  handleMetadataSet,
};
