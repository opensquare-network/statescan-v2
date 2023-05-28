const {
  isExtrinsicSuccess,
  extractExtrinsicEvents,
} = require("@osn/scan-common/src/utils");
const {
  handleSubIdentityExtrinsics,
  handleSubIdentityExtrinsicsV2,
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
      handleCall,
    );

    /*    //TODO: don't remove
    const {
      method: { method, section },
    } = extrinsic;
    if (isNotIdentityExtrinsic(method, section)) {
      continue;
    }

    //   await handleSubIdentityExtrinsics(extrinsic, indexer, method);
    const author = extrinsic.signer.toString();
    const extrinsicData = extrinsic.method.args[0];
    await handleSubIdentityExtrinsicsV2(
      author,
      extrinsicData,
      extrinsicIndexer,
      method,
    );*/
  }
}

//TODO:handle nested calls
async function handleNestedExtrinsics(call, author, extrinsicIndexer) {
  const [section, method] = [call.section, call.method];

  if (isNotIdentityExtrinsic(method, section)) {
    return;
  }

  console.log("handleNestedExtrinsics:::::section", section, "method", method);

  const extrinsicData = call.toJSON().args;

  await handleSubIdentityExtrinsicsV2(
    author,
    extrinsicData,
    extrinsicIndexer,
    method,
  );
}

// eslint-disable-next-line no-unused-vars
async function handleCall(call, author, extrinsicIndexer, wrappedEvents) {
  await handleNestedExtrinsics(...arguments);
}

// boolean function to check if the extrinsic is a setSubs or renameSub extrinsic and identity section
function isNotIdentityExtrinsic(method, section) {
  return section !== IDENTITY && ![SET_SUBS, RENAME_SUB].includes(method);
}

module.exports = {
  handleExtrinsics,
};
