const { currentChain } = require("../../env");
const { transferOnBlockChains } = require("../../utils/consts/chains");
const {
  asset: { getTransferCollection },
  block: { getTransferCol: getBlockTransferCol },
} = require("@statescan/mongo");

async function getTransferColByChain() {
  const chain = currentChain();
  if (transferOnBlockChains.includes(chain)) {
    return await getBlockTransferCol();
  } else {
    return await getTransferCollection();
  }
}

module.exports = {
  getTransferColByChain,
};
