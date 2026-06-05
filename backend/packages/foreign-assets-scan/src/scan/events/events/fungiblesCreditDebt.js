const { updateForeignAssetNoTimeline } = require("./common/updateForeignAsset");
const {
  foreignAsset: { insertForeignAssetActivity },
} = require("@statescan/mongo");

// IssuedCredit, BurnedCredit, IssuedDebt, BurnedDebt only have asset_id and amount
// https://github.com/paritytech/polkadot-sdk/blob/master/substrate/frame/assets/src/lib.rs
async function handleFungiblesCreditDebt(event, indexer) {
  const { data } = event;
  const assetId = data[0].hash.toString();
  const amount = data[1].toString();

  await updateForeignAssetNoTimeline(event, indexer);
  await insertForeignAssetActivity(assetId, event.method, { amount }, indexer);
}

module.exports = {
  handleFungiblesCreditDebt,
};
