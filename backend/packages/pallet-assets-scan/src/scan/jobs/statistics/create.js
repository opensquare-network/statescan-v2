const { getLastBlockIndexer } = require("./date");
const { getActiveAssets, getAssetStatistic } = require("./data/assets");
const {
  palletAsset: { getStatisticCol },
} = require("@statescan/mongo");

async function createAssetStatistics() {
  const assets = await getActiveAssets();
  if (assets.length <= 0) {
    return;
  }

  const indexer = getLastBlockIndexer();
  if (!indexer) {
    return;
  }

  const promises = assets.map(({ assetId, assetHeight }) =>
    getAssetStatistic(assetId, assetHeight, indexer),
  );
  const statistics = await Promise.all(promises);

  const col = await getStatisticCol();
  const bulk = col.initializeUnorderedBulkOp();
  for (const statistic of statistics) {
    bulk.insert(statistic);
  }
  await bulk.execute();
}

module.exports = {
  createAssetStatistics,
};
