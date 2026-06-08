const { addAssetAddresses } = require("../../../store/assetsAccounts");
const { updateAssetDetail } = require("./common/updateAssetDetail");
const {
  insertAssetActivity,
} = require("../../mongo/assets/insertAssetActivity");

async function handleBurned(event, indexer) {
  const { data } = event;
  const assetId = data[0].toNumber();
  const owner = data[1].toString();
  const balance = data[2].toString();

  await updateAssetDetail(assetId, indexer);
  await insertAssetActivity(assetId, event.method, { owner, balance }, indexer);

  addAssetAddresses(indexer.blockHash, assetId, [owner]);
}

module.exports = {
  handleBurned,
};
