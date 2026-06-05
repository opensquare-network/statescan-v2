const { updateAssetDetail } = require("./common/updateAssetDetail");
const { addAssetAddresses } = require("../../../../store/assetsAccounts");
const {
  palletAsset: { insertPalletAssetActivity },
} = require("@statescan/mongo");

async function handleIssued(event, indexer) {
  const { data } = event;
  const assetId = data[0].toNumber();
  const beneficiary = data[1].toString();
  const amount = data[2].toBigInt().toString();

  await updateAssetDetail(assetId, indexer);
  await insertPalletAssetActivity(
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
