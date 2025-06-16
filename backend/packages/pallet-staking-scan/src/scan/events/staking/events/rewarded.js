const {
  palletStaking: { insertStakingReward },
} = require("@statescan/mongo");
const { getStakingInfo, getCurrentEra } = require("../../../common/query");
const { parseRewardDestination } = require("../../../common/utils");

async function handleRewarded(event, indexer) {
  const stash = event.data[0].toString();
  const dest = event.data[1];
  const amount = event.data[2].toString();

  const { destType, destAccount } = parseRewardDestination(dest);

  const currentEra = await getCurrentEra(indexer?.blockHash?.toString());

  const stakingInfo = await getStakingInfo(
    stash,
    currentEra,
    indexer?.blockHash?.toString(),
  );

  const rewardId = `${indexer.blockHeight}-${indexer.eventIndex}`;

  await insertStakingReward({
    rewardId,
    stash,
    amount,
    destType,
    destAccount,
    era: currentEra,
    isValidator: stakingInfo.isValidator,
    exposure: stakingInfo.exposure,
    nominatorInfo: stakingInfo.nominatorInfo,
    indexer,
  });
}

module.exports = {
  handleRewarded,
};
