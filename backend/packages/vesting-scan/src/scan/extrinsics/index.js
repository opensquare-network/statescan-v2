const {
  utils: { extractExtrinsicEvents, isExtrinsicSuccess },
  handleCallsInExtrinsic,
} = require("@osn/scan-common");

async function handleCall(call, author, extrinsicIndexer, wrappedEvents) {
  // todo: handle calls
}

async function handleExtrinsics(extrinsics = [], allEvents = [], blockIndexer) {
  let index = 0;
  for (const extrinsic of extrinsics) {
    const events = extractExtrinsicEvents(allEvents, index);
    if (!isExtrinsicSuccess(events)) {
      continue;
    }

    const extrinsicIndexer = { ...blockIndexer, extrinsicIndex: index++ };
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
