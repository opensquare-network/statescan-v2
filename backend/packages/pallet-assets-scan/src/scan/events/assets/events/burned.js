const { updateAsset } = require("./common/updateAsset");
const { addAssetAddresses } = require("../../../../store/assetsAccounts");

async function handleBurned(event, indexer) {
  const { data } = event;
  const owner = data[1].toString();
  await updateAsset(event, indexer, {
    owner,
    balance: data[2].toBigInt().toString(),
  });

  addAssetAddresses(indexer.blockHash, data[0].toNumber(), [owner]);
}

module.exports = {
  handleBurned,
};
