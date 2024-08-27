const { chainCall } = require("../../../chainApi");
const { getEventData } = require("./getEvent");
const { extractEvent } = require("./extractEventInfo");

async function event(_, _args) {
  const { blockHeight, eventIndex } = _args;
  const eventData = await chainCall((api) =>
    getEventData(api, blockHeight, eventIndex),
  );
  if (!eventData) {
    return;
  }
  return extractEvent(eventData.event, eventData.indexer);
}

module.exports = {
  event,
};
