require("dotenv").config();
const {
  initEvmWeb3InstanceConditionally,
  getEvmWeb3Instance,
} = require("../../evm/web3");
const {
  block: { getEvmTxCol },
} = require("@statescan/mongo");

async function getReceiptStatus(txHash) {
  const web3 = getEvmWeb3Instance();
  const receipt = await web3.eth.getTransactionReceipt(txHash);

  return receipt.status;
}

async function get10NonStatusTx() {
  const col = await getEvmTxCol();
  return await col
    .find({ "receipt.status": { $exists: false } })
    .limit(100)
    .toArray();
}

// append evm tx receipt status field
(async () => {
  await initEvmWeb3InstanceConditionally();
  const col = await getEvmTxCol();

  let txs = await get10NonStatusTx();
  while (txs.length > 0) {
    let promises = [];
    for (const tx of txs) {
      const status = await getReceiptStatus(tx.hash);
      const promise = col.findOneAndUpdate(
        { hash: tx.hash },
        { $set: { "receipt.status": status } },
      );
      promises.push(promise);
    }
    await Promise.all(promises);
    console.log(`${txs.length} txs updated successfully.`);

    txs = await get10NonStatusTx();
  }

  process.exit(0);
})();
