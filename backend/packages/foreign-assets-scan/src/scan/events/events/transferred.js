const { addAssetsTransfer } = require("../../../store/assetsTransfers");
const { addAssetId } = require("../../../store/assets");
const { addAssetAddresses } = require("../../../store/assetsAccounts");

async function handleTransferred(event, indexer) {
  const { data } = event;
  const assetId = data[0].hash.toString();
  const from = data[1].toString();
  const to = data[2].toString();
  const amount = data[3].toBigInt().toString();

  let transfer = {
    assetId,
    indexer,
    from,
    to,
    balance: amount,
  };

  addAssetsTransfer(indexer.blockHash, transfer);
  addAssetId(indexer.blockHash, assetId);
  addAssetAddresses(indexer.blockHash, assetId, [from, to]);
}

module.exports = {
  handleTransferred,
};
