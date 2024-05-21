const { getAssetIds, clearAssetIds } = require("../../store/assets");
const { queryAsset } = require("../query/assets/asset");
const {
  palletAsset: { getAssetCol },
} = require("@statescan/mongo");

async function batchUpdateAssets(indexer) {
  const assetIds = getAssetIds(indexer.blockHash);
  if (assetIds.length < 1) {
    return;
  }

  const promises = assetIds.map((assetId) =>
    queryAsset(indexer.blockHash, assetId),
  );
  const assets = await Promise.all(promises);

  const col = await getAssetCol();
  const bulk = col.initializeUnorderedBulkOp();
  let index = 0;
  for (const assetId of assetIds) {
    const detail = assets[index++];
    bulk.find({ assetId, destroyed: false }).update({ $set: { detail } });
  }
  await bulk.execute();

  clearAssetIds(indexer.blockHash);
}

module.exports = {
  batchUpdateAssets,
};
