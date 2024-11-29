const { getEvmWeb3Instance } = require("../../../../evm/web3");
const {
  block: { getEvmTxCol },
} = require("@statescan/mongo");
const { normalizeTx } = require("./normalizeTx");
const { queryAndGetReceipt } = require("./receipt");
const {
  env: { currentChain },
} = require("@osn/scan-common");
const isNil = require("lodash.isnil");

function findExtrinsicIndex(txHash, events) {
  const targetEvent = events.find((e) => {
    const { event } = e;
    const { section, method } = event;
    if ("ethereum" !== section || "Executed" !== method) {
      return false;
    }

    return event.data[2].toString() === txHash;
  });
  if (!targetEvent) {
    return null;
  }

  return targetEvent.phase.isNone ? null : targetEvent.phase.value.toNumber();
}

async function handleOneTransaction(tx, blockIndexer, blockEvents) {
  const col = await getEvmTxCol();
  const receipt = await queryAndGetReceipt(tx.hash);
  const extrinsicIndex = findExtrinsicIndex(tx.hash, blockEvents);
  const indexer = {
    ...blockIndexer,
    ...(isNil(extrinsicIndex) ? {} : { extrinsicIndex }),
  };
  await col.insertOne({
    indexer,
    ...normalizeTx(tx),
    receipt,
  });
}

async function queryAndSaveEvmTxs(blockIndexer, blockEvents) {
  if (!["laos"].includes(currentChain())) {
    return;
  }

  const web3 = getEvmWeb3Instance();
  const block = await web3.eth.getBlock(blockIndexer.blockHeight, true);

  for (const transaction of block.transactions) {
    await handleOneTransaction(transaction, blockIndexer, blockEvents);
  }
}

module.exports = {
  queryAndSaveEvmTxs,
};
