const { Modules, ProxyEvents } = require("../consts");

function isProxyExecutedOk(events = []) {
  const event = events.find(
    ({ event }) =>
      event.section === Modules.Proxy &&
      ProxyEvents.ProxyExecuted === event.method,
  );

  if (!event) {
    return false;
  }

  return event.event?.data[0].isOk;
}

module.exports = { isProxyExecutedOk };
