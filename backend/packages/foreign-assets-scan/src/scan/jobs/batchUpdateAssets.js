const {
  foreignAsset: { getAssetCol },
} = require("@statescan/mongo");
const { getAssetIds } = require("../../store/assets");
const { queryForeignAssetById } = require("../query/assets/assets");

async function batchUpdateForeignAssets(indexer) {
  const assetIds = getAssetIds(indexer.blockHash);
  if (assetIds.length < 1) {
    return;
  }

  const promises = assetIds.map((assetId) =>
    queryForeignAssetById(indexer.blockHash, assetId),
  );
  const assets = await Promise.all(promises);

  const col = await getAssetCol();
  const bulk = col.initializeUnorderedBulkOp();
  let index = 0;
  for (const assetId of assetIds) {
    const detail = assets[index++];
    bulk.find({ assetId }).update({ $set: { detail } });
  }
  if (bulk.length > 0) {
    await bulk.execute();
  }
}

module.exports = {
  batchUpdateForeignAssets,
};
