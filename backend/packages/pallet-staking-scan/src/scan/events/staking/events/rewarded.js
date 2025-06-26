const {
  palletStaking: { insertStakingReward },
} = require("@statescan/mongo");
const { getCurrentEra } = require("../../../common/query");

async function handleRewarded(event, indexer) {
  // todo: 1. get who get the reward -> done
  // todo: 2. get the validator // get the latest PayoutStarted event and find the validator_stash
  // todo: 2-1.
  // todo: 3. get the amount -> done
  // todo: 4. get era -> solved
  // todo: 5. time -> done
  const stash = event.data[0].toString();
  const dest = event.data[1];
  const amount = event.data[2].toString();
  const currentEra = await getCurrentEra(indexer?.blockHash);
  const rewardId = `${indexer.blockHeight}-${indexer.eventIndex}`;

  await insertStakingReward({
    rewardId,
    stash,
    dest,
    amount,
    era: currentEra,
    indexer,
  });
}

module.exports = {
  handleRewarded,
};
