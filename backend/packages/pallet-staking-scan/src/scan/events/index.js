const { handleStakingEvent } = require("./staking");

async function handleEvents(events = [], blockIndexer) {
  if (events.length <= 0) {
    return;
  }

  for (let eventIndex = 0; eventIndex < events.length; eventIndex++) {
    let indexer = {
      ...blockIndexer,
      eventIndex,
    };

    const { event, phase } = events[eventIndex];
    if (!phase.isNone) {
      const extrinsicIndex = phase.value.toNumber();
      indexer = {
        ...indexer,
        extrinsicIndex,
      };
    }

    await handleStakingEvent(event, indexer);
  }
}

module.exports = {
  handleEvents,
};