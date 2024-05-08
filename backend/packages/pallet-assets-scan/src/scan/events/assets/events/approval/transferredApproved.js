const { addAssetsTransfer } = require("../../../../../store/assetsTransfers");
const { addAssetId } = require("../../../../../store/assets");
const { addAssetAddresses } = require("../../../../../store/assetsAccounts");
const { updateApproval } = require("../../../../jobs/approval/update");

async function handleTransferredApproved(event, indexer) {
  const assetId = event.data[0].toNumber();
  const owner = event.data[1].toString();
  const delegate = event.data[2].toString();
  const destination = event.data[3].toString();
  const transfer = {
    indexer,
    assetId,
    from: owner,
    to: destination,
    balance: event.data[4].toBigInt().toString(),
  };

  addAssetsTransfer(indexer.blockHash, transfer);
  addAssetId(indexer.blockHash, assetId);
  addAssetAddresses(indexer.blockHash, assetId, [owner, destination]);
  await updateApproval(assetId, owner, delegate, indexer);
}

module.exports = {
  handleTransferredApproved,
};
