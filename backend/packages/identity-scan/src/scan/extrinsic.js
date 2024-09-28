const { handleSetFieldsCall } = require("./calls/setFields");
const { handleSetAccountIdCall } = require("./calls/setAccountId");
const { handleSetFeeCall } = require("./calls/setFee");
const { handleRenameSub } = require("./calls/renameSub");
const { handleSetSubs } = require("./calls/setSubs");
const {
  utils: { isExtrinsicSuccess, extractExtrinsicEvents },
} = require("@osn/scan-common");
const { handlePureNestedCalls } = require("./calls/common/nested");

async function handleCalls(call, author, extrinsicIndexer) {
  await handleSetSubs(call, author, extrinsicIndexer);
  await handleRenameSub(call, author, extrinsicIndexer);
  await handleSetFeeCall(call, author, extrinsicIndexer);
  await handleSetAccountIdCall(call, author, extrinsicIndexer);
  await handleSetFieldsCall(call, author, extrinsicIndexer);
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
