const { extractEventArgs } = require("./args");

function normalizeEventInSimpleMode(wrappedEvent, blockIndexer, eventIndex) {
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

  const args = extractEventArgs(event);
  return {
    indexer,
    isExtrinsic,
    section,
    method,
    args,
  };
}

module.exports = {
  normalizeEventInSimpleMode,
};
