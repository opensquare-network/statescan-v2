const { handleBalancesEvent } = require("./balances");
const {
  store: { getBlockNativeTransfers, clearNativeTransfers },
} = require("@statescan/common");
const {
  block: { batchInsertTransfers },
} = require("@statescan/mongo");

async function handleEvents(events = [], blockIndexer, extrinsics = []) {
  if (events.length <= 0) {
    return;
  }

  for (let eventIndex = 0; eventIndex < events.length; eventIndex++) {
    let indexer = { ...blockIndexer, eventIndex };
    const { event, phase } = events[eventIndex];
    let extrinsic;
    if (!phase.isNone) {
      const extrinsicIndex = phase.value.toNumber();
      indexer = { ...indexer, extrinsicIndex };
      extrinsic = extrinsics[extrinsicIndex];
    }

    await handleBalancesEvent(event, indexer, extrinsic);
  }

  const transfers = getBlockNativeTransfers(blockIndexer.blockHash);
  await batchInsertTransfers(transfers);
  clearNativeTransfers(blockIndexer.blockHash);
}

module.exports = {
  handleEvents,
};
