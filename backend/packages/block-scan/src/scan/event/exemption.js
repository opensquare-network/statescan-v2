function isExemptedEvent(wrappedEvent) {
  const { event } = wrappedEvent;
  const { section, method } = event;

  const isExtrinsicResult =
    "system" === section &&
    ["ExtrinsicSuccess", "ExtrinsicFailed"].includes(method);
  const isParaInclusion =
    "paraInclusion" === section &&
    ["CandidateIncluded", "CandidateBacked"].includes(method);
  // todo: exempt other events

  return isExtrinsicResult || isParaInclusion;
}

module.exports = {
  isExemptedEvent,
};
