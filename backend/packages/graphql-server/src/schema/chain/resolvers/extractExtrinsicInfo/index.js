const {
  extractExtrinsicEvents,
} = require("../extractBlockInfo/extractExtrinsics");
const { extractEvent } = require("../extractEventInfo");
const { extractCallsFromExtrinsic } = require("./extractCallsFromExtrinsic");
const { normalizeExtrinsic } = require("./normalizeExtrinsic");

function extractExtrinsicEventInfos(allBlockEvents, extrinsicIndexer) {
  const { extrinsicIndex } = extrinsicIndexer;
  const events = [];
  for (let eventIndex = 0; eventIndex < allBlockEvents.length; eventIndex++) {
    const event = allBlockEvents[eventIndex];
    const { phase } = event;
    if (phase.isNone || phase.value.toNumber() !== extrinsicIndex) {
      continue;
    }
    const info = extractEvent(event, { ...extrinsicIndexer, eventIndex });
    events.push(info);
  }
  return events;
}

async function extractExtrinsicInfo(api, extrinsicData) {
  console.log({ extrinsicData });
  if (!extrinsicData) {
    return null;
  }
  const { extrinsic, allBlockEvents, indexer } = extrinsicData;
  const events = extractExtrinsicEvents(allBlockEvents, indexer.extrinsicIndex);
  const calls = await extractCallsFromExtrinsic(
    api,
    extrinsic,
    events,
    indexer,
  );
  const extrinsicInfo = normalizeExtrinsic(extrinsic, events, indexer);
  const eventInfos = extractExtrinsicEventInfos(allBlockEvents, indexer);
  return {
    ...extrinsicInfo,
    calls,
    callsCount: calls.length,
    events: eventInfos,
    eventsCount: eventInfos.length,
  };
}

module.exports = {
  extractExtrinsicInfo,
};
