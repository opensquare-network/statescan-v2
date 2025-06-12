const {
  palletStaking: { insertStakingReward, getStakingRewardTimelineCol },
} = require("@statescan/mongo");

async function handleRewarded(event, indexer) {
  const stash = event.data[0].toString();
  const amount = event.data[1].toString();

  const rewardId = `${indexer.blockHeight}-${indexer.eventIndex}`;

  await insertStakingReward({
    rewardId,
    stash,
    amount,
    indexer,
  });

  const timelineCol = await getStakingRewardTimelineCol();
  await timelineCol.insertOne({
    rewardId,
    name: event.method,
    args: {
      stash,
      amount,
    },
    indexer,
  });
}

module.exports = {
  handleRewarded,
};
