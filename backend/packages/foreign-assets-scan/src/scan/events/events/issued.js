const { addAssetAddresses } = require("../../../store/assetsAccounts");
const { updateForeignAssetNoTimeline } = require("./common/updateForeignAsset");
const {
  foreignAsset: { insertForeignAssetActivity },
} = require("@statescan/mongo");

async function handleIssued(event, indexer) {
  const { data } = event;
  const assetId = data[0].hash.toString();
  const beneficiary = data[1].toString();
  const amount = data[2].toString();

  await updateForeignAssetNoTimeline(event, indexer);
  await insertForeignAssetActivity(
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
