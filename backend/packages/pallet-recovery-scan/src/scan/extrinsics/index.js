const {
  utils: { isExtrinsicSuccess, extractExtrinsicEvents },
  extrinsic: { handlePureNestedCalls },
} = require("@osn/scan-common");
const { handleAsRecovered } = require("./calls/asRecovered");

async function handleCalls(call, author, extrinsicIndexer) {
  await handleAsRecovered(call, author, extrinsicIndexer);
}

async function handleExtrinsics(extrinsics = [], allEvents = [], indexer) {
  let index = 0;

  for (const extrinsic of extrinsics) {
    const events = extractExtrinsicEvents(allEvents, index);
    if (!isExtrinsicSuccess(events)) {
      continue;
    }

    const extrinsicIndexer = { ...indexer, extrinsicIndex: index++ };
    await handlePureNestedCalls(extrinsic, extrinsicIndexer, handleCalls);
  }
}

module.exports = {
  handleExtrinsics,
};
