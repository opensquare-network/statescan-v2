const { batchInsertForeignAssetsTransfers } = require("../jobs/transfers");
const { batchUpdateForeignAssets } = require("../jobs/batchUpdateAssets");
const {
  batchUpdateForeignAssetHolders,
} = require("../jobs/batchUpdateHolders");
const { clearAssetIds } = require("../../store/assets");
const { clearAssetsTransfers } = require("../../store/assetsTransfers");
const { clearAssetAddresses } = require("../../store/assetsAccounts");

async function doBatchJobAfterEvents(indexer) {
  await batchInsertForeignAssetsTransfers(indexer);
  await batchUpdateForeignAssets(indexer);
  await batchUpdateForeignAssetHolders(indexer);

  clearAssetsTransfers(indexer.blockHash);
  clearAssetIds(indexer.blockHash);
  clearAssetAddresses(indexer.blockHash);
}

module.exports = {
  doBatchJobAfterEvents,
};
