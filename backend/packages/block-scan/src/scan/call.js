const {
  handleCallsInExtrinsic,
  utils: { extractExtrinsicEvents, isExtrinsicSuccess },
  call: { normalizeCall },
} = require("@osn/scan-common");

let extrinsicCallIndex = 0;
let extrinsicCalls = [];

async function handleCall(call, author, extrinsicIndexer, wrappedEvents) {
  const normalizedCall = normalizeCall(call);
  const indexer = {
    ...extrinsicIndexer,
    callIndex: extrinsicCallIndex,
  }

  extrinsicCalls.push({
    indexer,
    ...normalizedCall,
  })

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

    const extrinsicIndexer = { ...blockIndexer, extrinsicIndex: index++ };
    await handleCallsInExtrinsic(extrinsic, events, extrinsicIndexer, handleCall)
  }

  return extrinsicCalls;
}

module.exports = {
  extractCalls,
}
