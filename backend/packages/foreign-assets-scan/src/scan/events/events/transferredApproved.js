const { addAssetsTransfer } = require("../../../store/assetsTransfers");
const { addAssetId } = require("../../../store/assets");
const { addAssetAddresses } = require("../../../store/assetsAccounts");

async function handleTransferredApproved(event, indexer) {
  const { data } = event;
  const assetId = data[0].hash.toString();
  const owner = event.data[1].toString();
  const delegate = event.data[2].toString();
  const destination = event.data[3].toString();
  const transfer = {
    assetId,
    indexer,
    from: owner,
    to: destination,
    balance: event.data[4].toBigInt().toString(),
    delegate,
  };

  addAssetsTransfer(indexer.blockHash, transfer);
  addAssetId(indexer.blockHash, assetId);
  addAssetAddresses(indexer.blockHash, assetId, [owner, to]);
}

module.exports = {
  handleTransferredApproved,
};
