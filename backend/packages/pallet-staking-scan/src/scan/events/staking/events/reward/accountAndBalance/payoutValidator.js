const { getPayee } = require("../../../../../common");
const { isSameAddress } = require("@statescan/common/src/utils/address");
const {
  palletStaking: { insertStakingReward },
} = require("@statescan/mongo");
const { populateBondedIfNeed } = require("../../common/bonded");

async function handleRewardByPayoutValidator(
  event,
  indexer,
  extrinsic,
  leafCalls = [],
) {
  const who = event.data[0].toString();
  const amount = event.data[1].toString();

  const dest = await getPayee(who, indexer.blockHash);
  let era = null;
  const leafCall = leafCalls.find(({ origin }) => isSameAddress(origin, who));
  if (leafCall) {
    era = leafCall.call.args[0].toNumber();
  }

  const normalizedObj = await populateBondedIfNeed(
    {
      who,
      dest,
      amount,
      validator: who,
      isValidator: true,
      era,
      indexer,
    },
    indexer.blockHash,
  );
  await insertStakingReward(normalizedObj);
}

module.exports = {
  handleRewardByPayoutValidator,
};
