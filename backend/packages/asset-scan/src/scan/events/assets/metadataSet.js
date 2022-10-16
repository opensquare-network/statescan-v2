const { insertAssetTimeline } = require("../../mongo/assets/insertTimeline");
const { updateActiveAsset } = require("../../mongo/assets/updateAsset");
const { queryMetadata } = require("../../query/assets/metadata");

async function handleMetadataSet(event, indexer) {
  const { method, data } = event;
  const assetId = data[0].toNumber();

  const metadata = await queryMetadata(indexer.blockHash, assetId);
  await updateActiveAsset(assetId, { metadata });

  await insertAssetTimeline(
    {
      assetId,
      name: method,
      args: {
        name: data[1].toHuman(),
        symbol: data[2].toHuman(),
        decimals: data[3].toNumber(),
        isFrozen: data[4].toJSON(),
      },
    },
    indexer,
  );
}

module.exports = {
  handleMetadataSet,
};
