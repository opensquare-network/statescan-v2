const {
  utils: { isSameAddress },
} = require("@statescan/common");
const { getPayee } = require("../../../../../common");
const {
  palletStaking: { insertStakingReward },
} = require("@statescan/mongo");
const { populateBondedIfNeed } = require("../../common/bonded");

async function handleRewardByPayoutNominator(event, indexer, leafCalls = []) {
  const who = event.data[0].toString();
  const amount = event.data[1].toString();

  const leaf = (leafCalls || []).find(({ origin, call }) =>
    isSameAddress(origin, who),
  );
  if (!leaf) {
    throw new Error(
      `Can not find call by Reward event at ${indexer.blockHeight}`,
    );
  }

  const dest = await getPayee(who, indexer.blockHash);

  const args = leaf.call.args;
  const era = args[0].toNumber();
  const validators = args[1].map((tuple) => tuple[0].toString());

  const normalizedObj = await populateBondedIfNeed(
    {
      who,
      dest,
      amount,
      validator: null,
      isValidator: false,
      validators,
      era,
      indexer,
    },
    indexer.blockHash,
  );
  await insertStakingReward(normalizedObj);
}

module.exports = {
  handleRewardByPayoutNominator,
};
