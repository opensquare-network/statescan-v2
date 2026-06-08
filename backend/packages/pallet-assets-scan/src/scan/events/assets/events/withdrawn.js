const { updateAssetDetail } = require("./common/updateAssetDetail");
const { addAssetAddresses } = require("../../../../store/assetsAccounts");

async function handleWithdrawn(event, indexer) {
  const { data } = event;
  const assetId = data[0].toNumber();
  const who = data[1].toString();

  await updateAssetDetail(assetId, indexer);
  addAssetAddresses(indexer.blockHash, assetId, [who]);
}

module.exports = {
  handleWithdrawn,
};
