const {
  palletStaking: { insertStakingReward },
} = require("@statescan/mongo");
const {
  store: { getHeightBlockEvents },
} = require("@statescan/common");
const findLastIndex = require("lodash.findlastindex");

function getPayoutStartedEvent(indexer) {
  const { blockHeight, eventIndex } = indexer;
  const blockEvents = getHeightBlockEvents(blockHeight);
  const targetEvents = blockEvents.slice(0, eventIndex);
  const startIndex = findLastIndex(
    targetEvents,
    (e) => e.event.method === "PayoutStarted",
  );
  if (startIndex < 0) {
    throw new Error(`Can not find PayoutStarted event at ${blockHeight}`);
  }
  return targetEvents[startIndex].event;
}

function getEraAndValidator(indexer) {
  const payoutStartedEvent = getPayoutStartedEvent(indexer);
  return {
    era: payoutStartedEvent.data[0].toNumber(),
    validator: payoutStartedEvent.data[1].toString(),
  };
}

async function handleRewarded(event, indexer) {
  const stash = event.data[0].toString();
  const dest = event.data[1].toJSON();
  const amount = event.data[2].toString();

  const { era, validator } = getEraAndValidator(indexer);
  const isValidator = stash === validator;

  await insertStakingReward({
    who: stash,
    dest,
    amount,
    validator,
    isValidator,
    era,
    indexer,
  });
}

module.exports = {
  handleRewarded,
};
