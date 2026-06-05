const { updateAssetDetail } = require("./common/updateAssetDetail");
const {
  insertAssetActivity,
} = require("../../mongo/assets/insertAssetActivity");

// IssuedCredit, BurnedCredit, IssuedDebt, BurnedDebt only have asset_id and amount
// https://github.com/paritytech/polkadot-sdk/blob/master/substrate/frame/assets/src/lib.rs
async function handleFungiblesCreditDebt(event, indexer) {
  const { data } = event;
  const assetId = data[0].toNumber();
  const amount = data[1].toString();

  await updateAssetDetail(assetId, indexer);
  await insertAssetActivity(assetId, event.method, { amount }, indexer);
}

module.exports = {
  handleFungiblesCreditDebt,
};
