const { handleIdentityEvents } = require("./identity");

/**
 * handle events and extrinsics
 *
 * @param events
 * @param blockIndexer
 * @param extrinsics
 * @returns {Promise<void>}
 */
async function handleEvents(events = [], blockIndexer) {
  if (events.length <= 0) {
    return;
  }

  for (let eventIndex = 0; eventIndex < events.length; eventIndex++) {
    let indexer = {
      ...blockIndexer,
      eventIndex,
    };

    const { event } = events[eventIndex];

    await handleIdentityEvents(event, indexer);
  }
}

module.exports = {
  handleEvents,
};
