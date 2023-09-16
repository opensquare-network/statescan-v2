const {
  handleCallsInExtrinsic,
  utils: { isExtrinsicSuccess, extractExtrinsicEvents },
} = require("@osn/scan-common");

async function handleCalls(call, author, extrinsicIndexer, wrappedEvents) {}

async function handleExtrinsics(extrinsics = [], allEvents = [], indexer) {
  let index = 0;

  for (const extrinsic of extrinsics) {
    const events = extractExtrinsicEvents(allEvents, index);
    if (!isExtrinsicSuccess(events)) {
      continue;
    }

    const extrinsicIndexer = { ...indexer, extrinsicIndex: index++ };
    await handleCallsInExtrinsic(
      extrinsic,
      events,
      extrinsicIndexer,
      handleCalls,
    );
  }
}

module.exports = {
  handleExtrinsics,
};
