const { UtilityEvents } = require("../consts");

function findInterrupted(wrappedEvents) {
  return (wrappedEvents?.events || []).find(
    ({ event }) => event?.method === UtilityEvents.BatchInterrupted,
  );
}

module.exports = { findInterrupted };
