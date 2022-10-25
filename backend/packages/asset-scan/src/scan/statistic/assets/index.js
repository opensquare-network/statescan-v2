const { isNewDay, setLastBlockIndexer } = require("../date");
const { getActiveAssets, getAssetStatistic } = require("./assets");
const {
  asset: { getAssetDailyStatisticCol },
} = require("@statescan/mongo");

async function createAssetStatistics(indexer) {
  const assets = await getActiveAssets();
  if (assets.length <= 0) {
    return;
  }

  const promises = assets.map(({ assetId, assetHeight }) =>
    getAssetStatistic(assetId, assetHeight, indexer),
  );
  const statistics = await Promise.all(promises);

  const col = await getAssetDailyStatisticCol();
  const bulk = col.initializeUnorderedBulkOp();
  for (const statistic of statistics) {
    bulk.insert(statistic);
  }
  await bulk.execute();
}

async function tryCreateAssetStatistics(indexer) {
  if (isNewDay(indexer)) {
    await createAssetStatistics(indexer);
  }

  setLastBlockIndexer(indexer);
}

module.exports = {
  tryCreateAssetStatistics,
};
