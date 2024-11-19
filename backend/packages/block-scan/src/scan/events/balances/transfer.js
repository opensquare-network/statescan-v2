const {
  store: { addNativeTransfer },
} = require("@statescan/common");

async function handleTransfer(event, indexer, extrinsic) {
  const from = event.data[0].toString();
  const to = event.data[1].toString();
  const value = event.data[2].toJSON();

  let isSigned = false;
  if (extrinsic) {
    isSigned = extrinsic.isSigned;
  }

  addNativeTransfer(indexer.blockHash, {
    indexer,
    from,
    to,
    balance: value,
    isSigned,
  });
}

module.exports = {
  handleTransfer,
};
