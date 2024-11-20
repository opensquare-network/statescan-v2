// todo: 1. query EVM block and get transactions

const { getEvmWeb3Instance } = require("../../../../evm/web3");
const {
  block: { getEvmTxCol },
} = require("@statescan/mongo");
const { normalizeTx } = require("./normalizeTx");

async function handleOneTransaction(tx) {
  const col = await getEvmTxCol();
  await col.insertOne(normalizeTx(tx));
  // todo: query and handle tx receipt
}

async function queryAndSaveEvmTxs(blockHeight) {
  const web3 = getEvmWeb3Instance();
  const block = await web3.eth.getBlock(blockHeight, true);

  for (const transaction of block.transactions) {
    await handleOneTransaction(transaction);
  }
}

module.exports = {
  queryAndSaveEvmTxs,
};
