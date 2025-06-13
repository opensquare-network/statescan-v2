const {
  palletStaking: { insertStakingReward, getStakingRewardTimelineCol },
} = require("@statescan/mongo");
const { getStakingInfo, getCurrentEra } = require("../../../common/query");
const {
  chain: { getApi },
} = require("@osn/scan-common");

async function handleRewarded(event, indexer) {
  const stash = event.data[0].toString();
  const dest = event.data[1];
  const amount = event.data[2].toString();

  let destType = "Unknown";
  let destAccount = null;

  if (dest.isStaked) {
    destType = "Staked";
  } else if (dest.isStash) {
    destType = "Stash";
    destAccount = stash;
  } else if (dest.isController) {
    destType = "Controller";
    destAccount = null;
  } else if (dest.isAccount) {
    destType = "Account";
    destAccount = dest.asAccount.toString();
  } else if (dest.isNone) {
    destType = "None";
  }

  const api = await getApi();
  const blockHash = await api.rpc.chain.getBlockHash(indexer.blockHeight);

  const currentEra = await getCurrentEra(blockHash.toString());

  const stakingInfo = await getStakingInfo(
    stash,
    currentEra,
    blockHash.toString(),
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

  const timelineCol = await getStakingRewardTimelineCol();
  await timelineCol.insertOne({
    rewardId,
    name: event.method,
    args: {
      stash,
      dest: {
        type: destType,
        account: destAccount,
      },
      amount,
      era: currentEra,
      stakingInfo,
    },
    indexer,
  });
}

module.exports = {
  handleRewarded,
};
