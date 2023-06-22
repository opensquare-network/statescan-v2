const { handleSetFieldsCall } = require("./calls/setFields");
const { handleSetAccountIdCall } = require("./calls/setAccountId");
const { handleSetFeeCall } = require("./calls/setFee");
const { handleRenameSub } = require("./calls/renameSub");
const { handleSetSubs } = require("./calls/setSubs");
const {
  handleCallsInExtrinsic,
  utils: { isExtrinsicSuccess, extractExtrinsicEvents },
} = require("@osn/scan-common");

async function handleCalls(call, author, extrinsicIndexer, wrappedEvents) {
  await handleSetSubs(call, author, extrinsicIndexer, wrappedEvents);
  await handleRenameSub(call, author, extrinsicIndexer, wrappedEvents);
  await handleSetFeeCall(call, author, extrinsicIndexer, wrappedEvents);
  await handleSetAccountIdCall(call, author, extrinsicIndexer, wrappedEvents);
  await handleSetFieldsCall(call, author, extrinsicIndexer, wrappedEvents);
}

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
