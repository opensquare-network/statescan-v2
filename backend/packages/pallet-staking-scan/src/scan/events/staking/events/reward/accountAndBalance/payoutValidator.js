const { getPayee } = require("../../../../../common");
const { isSameAddress } = require("@statescan/common/src/utils/address");
const {
  palletStaking: { insertStakingReward },
} = require("@statescan/mongo");

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

  await insertStakingReward({
    who,
    dest,
    amount,
    validator: who,
    isValidator: true,
    era,
    indexer,
  });
}

module.exports = {
  handleRewardByPayoutValidator,
};
