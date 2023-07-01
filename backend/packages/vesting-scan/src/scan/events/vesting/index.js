const { handleVestingUpdated } = require("./vestingUpdated");
const { handleVestingCompleted } = require("./vestingCompleted");

async function handleVestingEvents(
  event,
  indexer,
  extrinsic,
  blockEvents = [],
) {
  await handleVestingUpdated(event, indexer);
  await handleVestingCompleted(event, indexer);
}

module.exports = {
  handleVestingEvents,
};
