const { addVestingEvent } = require("../../../store/event");

async function handleVestingEvents(
  event,
  indexer,
  extrinsic,
  blockEvents = [],
) {
  const { section, method } = event;
  if ("vesting" !== section) {
    return;
  }

  let parsedEvent;

  if ("VestingUpdated" === method) {
    parsedEvent = {
      type: method,
      account: event.data[0].toString(),
      unvested: event.data[1].toString(),
    };
  }

  if ("VestingCompleted" === method) {
    parsedEvent = { type: method, account: event.data[0].toString() };
  }

  if (!parsedEvent) {
    throw new Error(`Unknown event ${section}.${method}`);
  }

  parsedEvent = {
    indexer,
    event: parsedEvent,
  };

  addVestingEvent(parsedEvent);
}

module.exports = {
  handleVestingEvents,
};
