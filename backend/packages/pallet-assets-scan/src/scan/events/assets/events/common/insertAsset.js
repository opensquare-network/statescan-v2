const { queryAsset } = require("../../../../query/assets/asset");
const {
  palletAsset: { getAssetCol },
} = require("@statescan/mongo");

async function insertAsset(assetId, indexer) {
  const asset = await queryAsset(indexer.blockHash, assetId);
  const col = await getAssetCol();
  await col.insertOne({
    assetId,
    assetHeight: indexer.blockHeight,
    detail: asset,
    metadata: null,
    destroyed: false,
  });
}

module.exports = {
  insertAsset,
};
