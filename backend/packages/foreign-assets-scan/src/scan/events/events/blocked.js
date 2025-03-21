const { addAssetAddresses } = require("../../../store/assetsAccounts");

async function handleBlocked(event, indexer) {
  const assetId = event.data[0].hash.toString();
  const who = event.data[1].toString();

  addAssetAddresses(indexer.blockHash, assetId, [who]);
}

module.exports = {
  handleBlocked,
};
