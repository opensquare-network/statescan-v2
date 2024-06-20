const {
  utils: { isExtrinsicSuccess, extractExtrinsicEvents },
  extrinsic: { handlePureNestedCalls },
} = require("@osn/scan-common");
const { handleRemoveProxies } = require("./calls/removeProxies");
const { handleKillPure } = require("./calls/killPure");
const { handleRemoveAnnouncement } = require("./calls/removeAnnouncement");
const { handleRejectAnnouncement } = require("./calls/rejectAnnouncement");

async function handleCalls(call, author, extrinsicIndexer) {
  await handleRemoveProxies(call, author, extrinsicIndexer);
  await handleKillPure(call, author, extrinsicIndexer);
  await handleRemoveAnnouncement(call, author, extrinsicIndexer);
  await handleRejectAnnouncement(call, author, extrinsicIndexer);
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
