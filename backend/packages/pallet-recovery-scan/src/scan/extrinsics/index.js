const {
  utils: { isExtrinsicSuccess, extractExtrinsicEvents },
  extrinsic: { handlePureNestedCalls },
} = require("@osn/scan-common");
const { handleAsRecovered } = require("./calls/asRecovered");
const { handleCancelRecovered } = require("./calls/cancelRecovered");

async function handleCalls(call, author, extrinsicIndexer) {
  await handleAsRecovered(call, author, extrinsicIndexer);
  await handleCancelRecovered(call, author, extrinsicIndexer);
}

async function handleExtrinsics(extrinsics = [], allEvents = [], indexer) {
  let index = 0;

  for (const extrinsic of extrinsics) {
    const events = extractExtrinsicEvents(allEvents, index);
    const extrinsicIndexer = { ...indexer, extrinsicIndex: index++ };
    if (!isExtrinsicSuccess(events)) {
      continue;
    }

    await handlePureNestedCalls(extrinsic, extrinsicIndexer, handleCalls);
  }
}

module.exports = {
  handleExtrinsics,
};
