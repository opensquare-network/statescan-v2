const { getEthereumSection } = require("./consts");
const { markEvmBlock } = require("../../store");

async function handleEthereumEvent(event, indexer) {
  const { section } = event;
  if (section !== getEthereumSection()) {
    return false;
  }

  markEvmBlock(indexer.blockHeight);
}

module.exports = {
  handleEthereumEvent,
};
