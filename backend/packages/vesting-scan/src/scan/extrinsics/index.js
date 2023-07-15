const {
  utils: { extractExtrinsicEvents, isExtrinsicSuccess },
  handleCallsInExtrinsic,
} = require("@osn/scan-common");
const {
  handleVestedTransfer,
  handleForceVestedTransfer,
  handleVest,
  handleVestOther,
  handleMergeSchedules,
} = require("./calls");

async function handleCall(call, author, extrinsicIndexer, wrappedEvents) {
  await handleVestedTransfer(call, author, extrinsicIndexer);
  await handleForceVestedTransfer(call, author, extrinsicIndexer);
  await handleVest(call, author, extrinsicIndexer);
  await handleVestOther(call, author, extrinsicIndexer);
  await handleMergeSchedules(call, author, extrinsicIndexer);
}

async function handleExtrinsics(extrinsics = [], allEvents = [], blockIndexer) {
  let index = 0;
  for (const extrinsic of extrinsics) {
    const events = extractExtrinsicEvents(allEvents, index);
    if (!isExtrinsicSuccess(events)) {
      continue;
    }

    const extrinsicIndexer = {
      ...blockIndexer,
      extrinsicIndex: index++,
    };
    await handleCallsInExtrinsic(
      extrinsic,
      events,
      extrinsicIndexer,
      handleCall,
    );
  }
}

module.exports = {
  handleExtrinsics,
};
