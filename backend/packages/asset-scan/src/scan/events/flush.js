const { updateAssetsAccounts } = require("../../service/assets/holders");
const { saveAssets } = require("../../service/assets/updateAssets");
const {
  batchInsertAssetsTransfers,
} = require("../../service/assets/batchInsertTransfers");

// flush assets pallet data
async function flushAssetsData(indexer) {
  await batchInsertAssetsTransfers(indexer);
  await saveAssets(indexer);
  await updateAssetsAccounts(indexer);
}

module.exports = {
  flushAssetsData,
};
