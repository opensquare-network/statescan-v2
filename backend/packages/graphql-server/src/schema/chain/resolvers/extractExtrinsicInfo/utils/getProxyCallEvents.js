const { WrappedEvents } = require("../type/wrappedEvents");
const { ProxyEvents } = require("../consts");

function getProxyInnerCallEvents(wrappedEvents) {
  const source = wrappedEvents?.events || [];
  const index = source.findIndex(
    ({ event }) => event?.method === ProxyEvents.ProxyExecuted,
  );

  let events = source.slice(0, index);
  if (index < 0) {
    return wrappedEvents;
  }

  return new WrappedEvents(events, wrappedEvents.offset, true);
}

module.exports = { getProxyInnerCallEvents };
