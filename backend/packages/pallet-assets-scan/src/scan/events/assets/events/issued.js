const { updateAsset } = require("./common/updateAsset");
const { addAssetAddresses } = require("../../../../store/assetsAccounts");

async function handleIssued(event, indexer) {
  const { data } = event;
  const beneficiary = data[1].toString();
  await updateAsset(event, indexer, {
    beneficiary,
    amount: data[2].toBigInt().toString(),
  });

  addAssetAddresses(indexer.blockHash, data[0].toNumber(), [beneficiary]);
}

module.exports = {
  handleIssued,
};
