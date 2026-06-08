const { addAssetAddresses } = require("../../../store/assetsAccounts");
const { updateAssetDetail } = require("./common/updateAssetDetail");

// https://github.com/paritytech/polkadot-sdk/blob/master/substrate/frame/assets/src/impl_fungibles.rs
// fungibles::Balanced::done_deposit
async function handleDeposited(event, indexer) {
  const { data } = event;
  const assetId = data[0].toNumber();
  const who = data[1].toString();

  await updateAssetDetail(assetId, indexer);
  addAssetAddresses(indexer.blockHash, assetId, [who]);
}

module.exports = {
  handleDeposited,
};
