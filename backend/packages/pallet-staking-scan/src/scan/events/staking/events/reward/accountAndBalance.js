const { getCurrentEra } = require("../../../../common/query");
const { getPayee, getNominator } = require("../../../../common");
const { getBlockValidators } = require("../../../../store");
const {
  store: { getHeightBlockEvents },
} = require("@statescan/common");
const findLast = require("lodash.findlast");
const isNil = require("lodash.isnil");
const {
  palletStaking: { insertStakingReward },
} = require("@statescan/mongo");

async function getValidator(who, indexer) {
  const nominationInfo = await getNominator(who, indexer.blockHash);
  const validators = await getBlockValidators(indexer.blockHash);
  if (!nominationInfo || validators.includes(who)) {
    return who;
  }

  const blockEvents = getHeightBlockEvents(indexer.blockHeight);
  let targetEvents = blockEvents.slice(0, indexer.eventIndex);
  const targetEvent = findLast(targetEvents, (e) => {
    const { event, phase } = e;
    if (
      !isNil(indexer.extrinsicIndex) &&
      (phase.isNone || phase.value.toNumber() !== indexer.extrinsicIndex)
    ) {
      return false;
    }

    const { section, method } = event;
    if ("staking" !== section || "Reward" !== method) {
      return false;
    }

    const who = event.data[0].toString();
    return validators.includes(who);
  });

  return targetEvent ? targetEvent.event.data[0].toString() : null;
}

async function handleRewardWithAccountAndBalance(event, indexer) {
  const who = event.data[0].toString();
  const amount = event.data[1].toString();

  const currentEra = await getCurrentEra(indexer?.blockHash);
  const dest = await getPayee(who, indexer.blockHash);
  const validator = await getValidator(who, indexer);
  const isValidator = who === validator;

  await insertStakingReward({
    who,
    dest,
    amount,
    validator,
    isValidator,
    era: currentEra,
    indexer,
  });
}

module.exports = {
  handleRewardWithAccountAndBalance,
};
