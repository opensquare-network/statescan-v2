const { getEvmWeb3Instance } = require("../../../../evm/web3");
const {
  block: { getEvmTxCol },
} = require("@statescan/mongo");
const { normalizeTx } = require("./normalizeTx");
const { queryAndGetReceipt } = require("./receipt");
const {
  env: { currentChain },
} = require("@osn/scan-common");

async function handleOneTransaction(tx) {
  const col = await getEvmTxCol();
  const receipt = await queryAndGetReceipt(tx.hash);
  await col.insertOne({
    ...normalizeTx(tx),
    receipt,
  });
}

async function queryAndSaveEvmTxs(blockHeight) {
  if (!["laos"].includes(currentChain())) {
    return;
  }

  const web3 = getEvmWeb3Instance();
  const block = await web3.eth.getBlock(blockHeight, true);

  for (const transaction of block.transactions) {
    await handleOneTransaction(transaction);
  }
}

module.exports = {
  queryAndSaveEvmTxs,
};
