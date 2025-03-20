const { handleForeignAssetsEvent } = require("./events");
const { doBatchJobAfterEvents } = require("./batch");

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

    await handleForeignAssetsEvent(event, indexer, extrinsic);
  }

  await doBatchJobAfterEvents(blockIndexer);
}

module.exports = {
  handleEvents,
};
