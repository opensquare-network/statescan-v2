const {
  utils: { isExtrinsicSuccess, extractExtrinsicEvents },
  extrinsic: { handlePureNestedCalls },
} = require("@osn/scan-common");
const { handleRemoveProxies } = require("./calls/removeProxies");
const { handleKillPure } = require("./calls/killPure");
const { handleRemoveAnnouncement } = require("./calls/removeAnnouncement");
const { handleRejectAnnouncement } = require("./calls/rejectAnnouncement");
const { handleAddProxy } = require("./calls/addProxy");
const { handleRemoveProxy } = require("./calls/removeProxy");
const { handleProxyCall } = require("./calls/proxy");

async function handleCalls(call, author, extrinsicIndexer) {
  await handleAddProxy(call, author, extrinsicIndexer);
  await handleRemoveProxies(call, author, extrinsicIndexer);
  await handleKillPure(call, author, extrinsicIndexer);
  await handleRemoveAnnouncement(call, author, extrinsicIndexer);
  await handleRejectAnnouncement(call, author, extrinsicIndexer);
  await handleRemoveProxy(call, author, extrinsicIndexer);
  await handleProxyCall(call, author, extrinsicIndexer);
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
