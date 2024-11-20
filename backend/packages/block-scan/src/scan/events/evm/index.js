const { getEthereumSection } = require("./consts");
const { markEvmBlock } = require("../../store");

async function handleEthereumEvent(event, indexer, extrinsic) {
  const { section, method } = event;
  if (section !== getEthereumSection()) {
    return false;
  }

  markEvmBlock(indexer.blockHeight);
}

module.exports = {
  handleEthereumEvent,
};
