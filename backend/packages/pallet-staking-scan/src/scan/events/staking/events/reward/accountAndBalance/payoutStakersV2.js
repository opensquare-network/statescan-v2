const { getPayee, getNominator } = require("../../../../../common");
const { getBlockValidators } = require("../../../../../store");
const {
  store: { getBlockEvents },
  utils: { isSameAddress },
} = require("@statescan/common");
const findLast = require("lodash.findlast");
const isNil = require("lodash.isnil");
const {
  palletStaking: { insertStakingReward },
} = require("@statescan/mongo");
const {
  call: { findTargetCall },
} = require("@osn/scan-common");

async function getValidatorByPayoutStakersCall(who, indexer) {
  const nominationInfo = await getNominator(who, indexer.blockHash);
  const validators = await getBlockValidators(indexer.blockHash);
  if (!nominationInfo || validators.includes(who)) {
    return who;
  }

  const blockEvents = getBlockEvents(indexer.blockHeight);
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

async function handleRewardByPayoutStakersV2(event, indexer, extrinsic) {
  const who = event.data[0].toString();
  const amount = event.data[1].toString();

  const dest = await getPayee(who, indexer.blockHash);
  const validator = await getValidatorByPayoutStakersCall(who, indexer);
  const isValidator = who === validator;

  let era = null;
  let targetCall = null;
  if (validator && extrinsic) {
    targetCall = findTargetCall(extrinsic.method, (call) => {
      const { section, method, args } = call;
      if ("staking" === section || "payoutStakers" === method) {
        return isSameAddress(args[0].toString(), validator);
      } else {
        return false;
      }
    });
    if (targetCall) {
      era = targetCall.args[1].toNumber();
    }
  }

  await insertStakingReward({
    who,
    dest,
    amount,
    validator,
    isValidator,
    era,
    indexer,
  });
}

module.exports = {
  handleRewardByPayoutStakersV2,
};
