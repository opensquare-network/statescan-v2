const { chainCall } = require("../../../chainApi");
const { getEventData } = require("./getEvent");
const { extractEvent } = require("./extractEventInfo");

async function event(_, _args) {
  const { blockHeight, eventIndex } = _args;
  const extrinsicData = await chainCall((api) =>
    getEventData(api, blockHeight, eventIndex),
  );
  return extractEvent(extrinsicData);
}

module.exports = {
  event,
};
