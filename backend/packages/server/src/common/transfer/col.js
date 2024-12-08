const { currentChain } = require("../../env");
const { chains } = require("../../utils/consts/chains");
const {
  asset: { getTransferCollection },
  block: { getTransferCol: getBlockTransferCol },
} = require("@statescan/mongo");

async function getTransferColByChain() {
  const chain = currentChain();
  if (chain === chains.paseo) {
    return await getBlockTransferCol();
  } else {
    return await getTransferCollection();
  }
}

module.exports = {
  getTransferColByChain,
};
