const { isExemptedCall } = require("./exempt");
const {
  handleCallsInExtrinsic,
  utils: { extractExtrinsicEvents, isExtrinsicSuccess },
  call: { normalizeCall },
} = require("@osn/scan-common");

let extrinsicCallIndex = 0;
let extrinsicCalls = [];

async function handleCall(call, author, extrinsicIndexer, wrappedEvents) {
  const { section, method } = call;
  if (isExemptedCall(section, method)) {
    return
  }

  const normalizedCall = normalizeCall(call);
  const indexer = {
    ...extrinsicIndexer,
    callIndex: extrinsicCallIndex,
  }

  let eventAttributes = {
    isCall: false,
  };
  if (wrappedEvents.wrapped) {
    eventAttributes.isCall = true;
    eventAttributes.offset = wrappedEvents.offset;
    eventAttributes.offset = wrappedEvents.events.length;
  }

  extrinsicCalls.push({
    indexer,
    ...normalizedCall,
    eventAttributes,
  });

  extrinsicCallIndex++;
}

async function extractCalls(extrinsics, allEvents = [], blockIndexer) {
  extrinsicCalls = [];
  let index = 0;
  for (const extrinsic of extrinsics) {
    extrinsicCallIndex = 0;
    const events = extractExtrinsicEvents(allEvents, index);
    if (!isExtrinsicSuccess(events)) {
      continue;
    }

    // todo: filter out extrinsics which don't contain business calls
    //  sections include: timestamp, parachainSystem, parainherent, parainclusion, parascheduler,

    const extrinsicIndexer = { ...blockIndexer, extrinsicIndex: index++ };
    await handleCallsInExtrinsic(extrinsic, events, extrinsicIndexer, handleCall)
  }

  return [...extrinsicCalls];
}

module.exports = {
  extractCalls,
}
