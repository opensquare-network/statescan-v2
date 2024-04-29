const { addAssetAddresses } = require("../../../../../store/assetsAccounts");

async function handleTouched(event, indexer) {
  const assetId = event.data[0].toNumber();
  const who = event.data[1].toString();
  const depositor = event.data[2].toString();

  addAssetAddresses(indexer.blockHash, assetId, [who, depositor]);
}

module.exports = {
  handleTouched,
};
