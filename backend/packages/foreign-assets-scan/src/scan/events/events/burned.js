const { addAssetAddresses } = require("../../../store/assetsAccounts");
const { updateForeignAssetNoTimeline } = require("./common/updateForeignAsset");
const {
  foreignAsset: { insertForeignAssetActivity },
} = require("@statescan/mongo");

async function handleBurned(event, indexer) {
  const { data } = event;
  const assetId = data[0].hash.toString();
  const owner = data[1].toString();
  const balance = data[2].toString();

  await updateForeignAssetNoTimeline(event, indexer);
  await insertForeignAssetActivity(
    assetId,
    event.method,
    { owner, balance },
    indexer,
  );
  addAssetAddresses(indexer.blockHash, assetId, [owner]);
}

module.exports = {
  handleBurned,
};
