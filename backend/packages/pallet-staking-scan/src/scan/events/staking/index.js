const { logger } = require("@osn/scan-common");
const { getStakingSection } = require("../../common/section");
const { handleRewarded } = require("./events/rewarded");
const {
  store: { setKnownHeightMark },
} = require("@statescan/common");

async function handleEvent(event, indexer) {
  const { section, method } = event;
  if (section !== getStakingSection()) {
    return;
  }
  setKnownHeightMark(indexer.blockHeight);
  if (method === "Rewarded") {
    await handleRewarded(event, indexer);
  }
}

async function handleStakingEvent(event, indexer) {
  try {
    await handleEvent(event, indexer);
  } catch (e) {
    logger.error(
      `Error in handling staking pallet events at ${indexer.blockHeight}`,
      e,
    );
  }
}

module.exports = {
  handleStakingEvent,
};
