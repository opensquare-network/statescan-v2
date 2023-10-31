function isExemptedEvent(wrappedEvent) {
  const { event } = wrappedEvent;
  const { section, method } = event;

  return (
    "system" === section &&
    ["ExtrinsicSuccess", "ExtrinsicFailed"].includes(method)
  );

  // todo: exempt other events
}

module.exports = {
  isExemptedEvent,
};
