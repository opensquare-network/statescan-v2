const { addNativeTransfer } = require("../../../store/nativeTransfers");
const {
  utils: { toDecimal128 },
} = require("@statescan/common");

async function handleTransfer(event, indexer, extrinsic) {
  const eventData = event.data.toJSON();
  const [from, to, value] = eventData;

  let isSigned = false;
  if (extrinsic) {
    isSigned = extrinsic.isSigned;
  }

  let transfer = {
    indexer,
    from,
    to,
    balance: toDecimal128(value),
    isSigned,
  };

  addNativeTransfer(indexer.blockHash, transfer);
}

module.exports = {
  handleTransfer,
};
