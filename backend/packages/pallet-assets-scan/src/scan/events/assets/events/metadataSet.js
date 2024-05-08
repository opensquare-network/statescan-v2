const {
  utils: { chainFieldToString },
} = require("@statescan/common");
const { queryMetadata } = require("../../../query/assets/metadata");
const {
  palletAsset: { insertPalletAssetTimeline, updateActiveAsset },
} = require("@statescan/mongo");

async function handleMetadataSet(event, indexer) {
  const { method, data } = event;
  const assetId = data[0].toNumber();

  const metadata = await queryMetadata(indexer.blockHash, assetId);
  await updateActiveAsset(assetId, { metadata });

  await insertPalletAssetTimeline(
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
