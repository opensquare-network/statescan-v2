const { insertAssetTimeline } = require("../../mongo/assets/insertTimeline");
const { getActiveAsset } = require("../../mongo/assets/getActiveAsset");
const { updateActiveAsset } = require("../../mongo/assets/updateAsset");
const { queryMetadata } = require("../../query/assets/metadata");

async function handleMetadataSet(event, indexer) {
  const { method, data } = event;
  const assetId = data[0].toNumber();

  const metadata = await queryMetadata(indexer.blockHash, assetId);
  await updateActiveAsset(assetId, { metadata });
  const activeAsset = await getActiveAsset(assetId);
  if (!activeAsset) {
    throw new Error(
      `Can not find asset: ${assetId} when MetadataSet at ${indexer.blockHeight}`,
    );
  }

  await insertAssetTimeline({
    assetId,
    assetHeight: activeAsset.assetHeight,
    indexer,
    name: method,
    args: {
      name: data[1].toHuman(),
      symbol: data[2].toHuman(),
      decimals: data[3].toNumber(),
      isFrozen: data[4].toJSON(),
    },
  });
}

module.exports = {
  handleMetadataSet,
};
