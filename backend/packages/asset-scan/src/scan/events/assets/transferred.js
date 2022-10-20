const { addAssetId } = require("../../../store/assets");
const { addAssetsTransfer } = require("../../../store/assetsTransfers");
const {
  utils: { toDecimal128 },
  consts: { AssetModule },
} = require("@statescan/common");

async function handleTransferred(event, indexer, extrinsic) {
  const { data } = event;
  const assetId = data[0].toNumber();
  const from = data[1].toString();
  const to = data[2].toString();

  let isSigned = false;
  if (extrinsic) {
    isSigned = extrinsic.isSigned;
  }

  let transfer = {
    indexer,
    assetId,
    from,
    to,
    balance: toDecimal128(data[3].toString()),
    isSigned,
    assetModule: AssetModule.assets,
  };
  addAssetsTransfer(indexer.blockHash, transfer);
  addAssetId(assetId);
}

module.exports = {
  handleTransferred,
};
