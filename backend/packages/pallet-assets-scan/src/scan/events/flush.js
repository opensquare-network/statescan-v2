const { batchInsertAssetsTransfers } = require("../jobs/transfers");
const { batchUpdateAssets } = require("../jobs/batchUpdateAssets");
const { batchUpdateAssetHolders } = require("../jobs/batchUpdateHolders");

async function flushAssetsData(indexer) {
  await batchInsertAssetsTransfers(indexer);
  await batchUpdateAssets(indexer);
  await batchUpdateAssetHolders(indexer);
}

module.exports = {
  flushAssetsData,
};
