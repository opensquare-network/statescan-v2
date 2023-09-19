import { handleCallsInExtrinsic } from "./callInExtrinsic";
import { isExemptedCall } from "./exempt";
import { normalizeCall } from "./normalizeCall";

let extrinsicCallIndex = 0;
let extrinsicCalls = [];

async function handleCall(api, call, author, extrinsicIndexer, wrappedEvents) {
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

export async function extractCallsFromExtrinsic(
  api,
  extrinsic,
  events,
  extrinsicIndexer,
) {
  extrinsicCallIndex = 0;
  extrinsicCalls = [];

  await handleCallsInExtrinsic(
    api,
    extrinsic,
    events,
    extrinsicIndexer,
    (...args) => handleCall(...args),
  );

  return extrinsicCalls;
}
