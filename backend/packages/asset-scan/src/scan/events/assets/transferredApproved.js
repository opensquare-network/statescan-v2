const { addAssetsTransfer } = require("../../../store/assetsTransfers");
const { addAssetAddresses } = require("../../../store/assetsAccounts");
const { updateApproval } = require("../../../service/assets/approval");
const {
  utils: { toDecimal128 },
  consts: { AssetModule },
} = require("@statescan/common");

async function handleTransferredApproved(event, indexer, extrinsic) {
  let isSigned = false;
  if (extrinsic) {
    isSigned = extrinsic.isSigned;
  }

  const assetId = event.data[0].toNumber();
  const owner = event.data[1].toString();
  const delegate = event.data[2].toString();
  const destination = event.data[3].toString();

  let transfer = {
    indexer,
    assetId,
    from: owner,
    to: destination,
    balance: toDecimal128(event.data[4].toString()),
    isSigned,
    assetModule: AssetModule.assets,
  };
  addAssetsTransfer(indexer.blockHash, transfer);
  addAssetAddresses(indexer.blockHash, assetId, [owner, destination]);
  await updateApproval(assetId, owner, delegate, indexer);
}

module.exports = {
  handleTransferredApproved,
};
