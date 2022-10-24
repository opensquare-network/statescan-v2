const { addAssetAddresses } = require("../../../store/assetsAccounts");

async function handleFrozen(event, indexer) {
  addAssetAddresses(indexer.blockHash, event.data[0].toNumber(), [
    event.data[1].toString(),
  ]);
}

module.exports = {
  handleFrozen,
};
