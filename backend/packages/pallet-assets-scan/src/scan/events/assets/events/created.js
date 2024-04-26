const { queryAsset } = require("../../../query/assets/asset");
const {
  palletAsset: { getAssetCol, insertPalletAssetTimeline },
} = require("@statescan/mongo");

async function handleCreated(event, indexer) {
  const { method, data } = event;
  const assetId = data[0].toNumber();
  const asset = await queryAsset(indexer.blockHash, assetId);

  const col = await getAssetCol();
  await col.insertOne({
    assetId,
    assetHeight: indexer.blockHeight,
    detail: asset,
    metadata: null,
    destroyed: false,
  });

  const creator = data[1].toString();
  const owner = data[2].toString();
  const args = {
    assetId,
    creator,
    owner,
  };
  await insertPalletAssetTimeline(assetId, method, args, indexer);
}

module.exports = {
  handleCreated,
};
