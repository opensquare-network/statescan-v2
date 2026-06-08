const { addAssetAddresses } = require("../../../store/assetsAccounts");
const { updateForeignAssetNoTimeline } = require("./common/updateForeignAsset");

// https://github.com/paritytech/polkadot-sdk/blob/master/substrate/frame/assets/src/impl_fungibles.rs
// fungibles::Balanced::done_deposit
async function handleDeposited(event, indexer) {
  const { data } = event;
  const assetId = data[0].hash.toString();
  const who = data[1].toString();

  await updateForeignAssetNoTimeline(event, indexer);
  addAssetAddresses(indexer.blockHash, assetId, [who]);
}

module.exports = {
  handleDeposited,
};
