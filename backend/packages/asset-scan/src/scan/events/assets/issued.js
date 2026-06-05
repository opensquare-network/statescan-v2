const { addAssetAddresses } = require("../../../store/assetsAccounts");
const { updateAssetDetail } = require("./common/updateAssetDetail");
const {
  insertAssetActivity,
} = require("../../mongo/assets/insertAssetActivity");

async function handleIssued(event, indexer) {
  const { data } = event;
  const assetId = data[0].toNumber();
  const beneficiary = data[1].toString();
  const amount = data[2].toString();

  await updateAssetDetail(assetId, indexer);
  await insertAssetActivity(
    assetId,
    event.method,
    { beneficiary, amount },
    indexer,
  );

  addAssetAddresses(indexer.blockHash, assetId, [beneficiary]);
}

module.exports = {
  handleIssued,
};
