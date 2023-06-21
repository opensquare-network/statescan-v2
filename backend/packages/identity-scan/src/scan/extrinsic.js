const { handleSetFieldsCall } = require("./calls/setFields");
const { handleSetAccountIdCall } = require("./calls/setAccountId");
const { handleSetFeeCall } = require("./calls/setFee");
const { handleRenameSub } = require("./calls/renameSub");
const { handleSetSubs } = require("./calls/setSubs");
const {
  handleSubIdentityExtrinsics,
} = require("./calls/subIdentityExtrinsics");
const {
  handleCallsInExtrinsic,
  utils: { isExtrinsicSuccess, extractExtrinsicEvents },
} = require("@osn/scan-common");
const {
  SECTION: { IDENTITY },
  EXTRINSIC_METHOD: { SET_SUBS, RENAME_SUB },
} = require("./constants");

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

async function handleNestedExtrinsics(call, author, extrinsicIndexer) {
  const [section, method] = [call.section, call.method];

  if (isNotIdentityExtrinsic(section, method)) {
    return;
  }

  const extrinsicData = call.toJSON().args;

  await handleSubIdentityExtrinsics(
    author,
    extrinsicData,
    extrinsicIndexer,
    method,
  );
}

async function handleIdentityCalls(
  call,
  author,
  extrinsicIndexer,
  wrappedEvents,
) {
  await handleNestedExtrinsics(...arguments);
}

// boolean function to check if the extrinsic is a setSubs or renameSub extrinsic and identity section
function isNotIdentityExtrinsic(section, method) {
  return section !== IDENTITY || (method !== SET_SUBS && method !== RENAME_SUB);
}

module.exports = {
  handleExtrinsics,
};
