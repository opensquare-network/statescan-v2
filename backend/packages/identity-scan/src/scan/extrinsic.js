const {
  isExtrinsicSuccess,
  extractExtrinsicEvents,
} = require("@osn/scan-common/src/utils");
const {
  handleSubIdentityExtrinsics,
} = require("./extrinsics/subIdentityExtrinsics");
const { handleCallsInExtrinsic } = require("@osn/scan-common");
const {
  SECTION: { IDENTITY },
  EXTRINSIC_METHOD: { SET_SUBS, RENAME_SUB },
} = require("./constants");

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
      handleIdentityCalls,
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
