const {
  store: { addNativeTransfer },
} = require("@statescan/common");

async function handleTokensTransfer(event, indexer, extrinsic) {
  const currency = event.data[0];
  if (!currency.isToken) {
    return;
  }
  if (!currency.asToken.isIntr && "interlay" === process.env.CHAIN) {
    return;
  }
  if (!currency.asToken.isKint && "kintsugi" === process.env.CHAIN) {
    return;
  }

  const from = event.data[1].toString();
  const to = event.data[2].toString();
  const value = event.data[3].toJSON();
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
  handleTokensTransfer,
};
