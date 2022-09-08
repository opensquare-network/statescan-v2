const { handleCommonEvent } = require("./common");
const { handleBalancesEvent } = require("./balances");

async function handleEvents(events = [], indexer) {
  if (events.length <= 0) {
    return;
  }

  for (let sort = 0; sort < events.length; sort++) {
    const eventIndexer = {
      ...indexer,
      eventIndex: sort,
    }

    const { event } = events[sort];
    await handleBalancesEvent(event, eventIndexer);
    await handleCommonEvent(event, eventIndexer);
  }
}

module.exports = {
  handleEvents,
}
