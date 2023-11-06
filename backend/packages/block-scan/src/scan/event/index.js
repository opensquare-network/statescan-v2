const { isExemptedEvent } = require("./exemption");
const { isSimpleMode } = require("../../env");
const { normalizeEventInSimpleMode } = require("./simpleNormalize");
const { extractEventArgs } = require("./args");

function checkIsExtrinsicResult(section, method) {
  return (
    "system" === section &&
    ["ExtrinsicSuccess", "ExtrinsicFailed"].includes(method)
  );
}

function normalizeEvent(wrappedEvent, blockIndexer, eventIndex) {
  const { event, phase } = wrappedEvent;
  const isExtrinsic = phase.isApplyExtrinsic;

  let indexer = {
    ...blockIndexer,
    eventIndex,
  };

  const { section, method } = event;
  if (isExtrinsic) {
    const extrinsicIndex = phase.value.toNumber();
    indexer = { ...indexer, extrinsicIndex };
  }
  const isExtrinsicResult = checkIsExtrinsicResult(section, method);
  const docs = event.meta.docs.map((d) => d.toString());

  const args = extractEventArgs(event);
  return {
    indexer,
    isExtrinsic,
    isExtrinsicResult,
    docs,
    section,
    method,
    args,
  };
}

function normalizeEvents(events = [], blockIndexer) {
  let index = 0;
  let normalizedEvents = [];
  for (const event of events) {
    if (isExemptedEvent(event)) {
      index++;
      continue;
    }

    let normalizedEvent;
    if (isSimpleMode()) {
      normalizedEvent = normalizeEventInSimpleMode(event, blockIndexer, index);
    } else {
      normalizedEvent = normalizeEvent(event, blockIndexer, index);
    }
    normalizedEvents.push(normalizedEvent);
    index++;
  }

  return normalizedEvents;
}

module.exports = {
  normalizeEvents,
};
