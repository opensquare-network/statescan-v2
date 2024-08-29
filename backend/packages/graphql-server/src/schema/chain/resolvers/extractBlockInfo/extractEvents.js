const { extractEvent } = require("../extractEventInfo");

function extractEvents(allBlockEvents, blockIndexer) {
  return (allBlockEvents || []).map((event, eventIndex) =>
    extractEvent(event, { ...blockIndexer, eventIndex }),
  );
}

module.exports = {
  extractEvents,
};
