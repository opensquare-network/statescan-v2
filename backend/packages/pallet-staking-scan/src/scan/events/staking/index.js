const { logger } = require("@osn/scan-common");
const { getStakingSection } = require("../../common/section");
const { handleRewarded } = require("./events/rewarded");
const {
  store: { setKnownHeightMark },
} = require("@statescan/common");
const { handleReward } = require("./events/reward");

async function handleEvent(event, indexer, extrinsic) {
  const { section, method } = event;
  if (section !== getStakingSection()) {
    return;
  }
  setKnownHeightMark(indexer.blockHeight);
  if (method === "Rewarded") {
    await handleRewarded(event, indexer);
  } else if (method === "Reward") {
    await handleReward(event, indexer, extrinsic);
  }
}

async function handleStakingEvent(event, indexer, extrinsic) {
  try {
    await handleEvent(event, indexer, extrinsic);
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
