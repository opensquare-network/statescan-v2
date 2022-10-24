const { addAssetAddresses } = require("../../../store/assetsAccounts");
const { updateAsset } = require("./common/updateAsset");

async function handleBurned(event, indexer) {
  const { data } = event;
  const owner = data[1].toString();
  await updateAsset(event, indexer, {
    owner,
    balance: data[2].toString(),
  });

  addAssetAddresses(indexer.blockHash, data[0].toNumber(), [owner]);
}

module.exports = {
  handleBurned,
};
