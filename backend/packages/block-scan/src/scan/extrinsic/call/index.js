const { isExemptedCall } = require("./exempt");
const {
  handleCallsInExtrinsic,
  call: { normalizeCall },
} = require("@osn/scan-common");

let extrinsicCallIndex = 0;
let extrinsicCalls = [];

async function handleCall(call, author, extrinsicIndexer, wrappedEvents) {
  const { section, method } = call;
  if (isExemptedCall(section, method)) {
    return;
  }

  const normalizedCall = normalizeCall(call);
  const indexer = {
    ...extrinsicIndexer,
    callIndex: extrinsicCallIndex,
  };

  let eventAttributes = {
    isCall: false,
  };
  if (wrappedEvents.wrapped) {
    eventAttributes.isCall = true;
    eventAttributes.offset = wrappedEvents.offset;
    eventAttributes.length = wrappedEvents.events.length;
  }

  extrinsicCalls.push({
    indexer,
    ...normalizedCall,
    eventAttributes,
  });

  extrinsicCallIndex++;
}

async function extractCallsFromExtrinsic(extrinsic, events, extrinsicIndexer) {
  extrinsicCallIndex = 0;
  extrinsicCalls = [];
  await handleCallsInExtrinsic(extrinsic, events, extrinsicIndexer, handleCall);
  return extrinsicCalls;
}

module.exports = {
  extractCallsFromExtrinsic,
};
