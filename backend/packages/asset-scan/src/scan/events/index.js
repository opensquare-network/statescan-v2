const { updateAssetsAccounts } = require("../../service/assets/holders");
const {
  batchInsertAssetsTransfers,
} = require("../../service/assets/batchInsertTransfers");
const { saveAssets } = require("../../service/assets/updateAssets");
const { handleAssetsEvent } = require("./assets");
const { getBlockNativeTransfers } = require("../../store/nativeTransfers");
const { handleBalancesEvent } = require("./balances");
const {
  asset: { batchInsertTransfers },
} = require("@statescan/mongo");

async function handleEvents(events = [], blockIndexer, extrinsics = []) {
  if (events.length <= 0) {
    return;
  }

  for (let eventIndex = 0; eventIndex < events.length; eventIndex++) {
    let indexer = {
      ...blockIndexer,
      eventIndex,
    };
    const { event, phase } = events[eventIndex];
    let extrinsic;
    if (!phase.isNone) {
      const extrinsicIndex = phase.value.toNumber();
      indexer = {
        ...indexer,
        extrinsicIndex,
      };
      extrinsic = extrinsics[extrinsicIndex];
    }

    await handleBalancesEvent(event, indexer, extrinsic);
    await handleAssetsEvent(event, indexer, extrinsic);
  }

  const transfers = getBlockNativeTransfers(blockIndexer.blockHash);
  await batchInsertTransfers(transfers);

  await batchInsertAssetsTransfers(blockIndexer);
  await saveAssets(blockIndexer);
  await updateAssetsAccounts(blockIndexer);
}

module.exports = {
  handleEvents,
};
