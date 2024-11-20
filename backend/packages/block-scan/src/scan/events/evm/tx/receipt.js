const { getEvmWeb3Instance } = require("../../../../evm/web3");

async function queryAndGetReceipt(txHash) {
  const web3 = getEvmWeb3Instance();
  const receipt = await web3.eth.getTransactionReceipt(txHash);

  const gasUsed = receipt.gasUsed;
  return {
    gasUsed,
    cumulativeGasUsed: receipt.cumulativeGasUsed,
    effectiveGasPrice: receipt.effectiveGasPrice.toString(),
    logs: receipt.logs,
  };
}

module.exports = {
  queryAndGetReceipt,
};
