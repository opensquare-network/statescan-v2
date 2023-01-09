const {
  utils: { chainFieldToString },
} = require("@statescan/common");
const { insertAssetTimeline } = require("../../mongo/assets/insertTimeline");
const { updateActiveAsset } = require("../../mongo/assets/updateAsset");
const { queryMetadata } = require("../../query/assets/metadata");

async function handleMetadataSet(event, indexer) {
  const { method, data } = event;
  const assetId = data[0].toNumber();

  const metadata = await queryMetadata(indexer.blockHash, assetId);
  await updateActiveAsset(assetId, { metadata });

  await insertAssetTimeline(
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
