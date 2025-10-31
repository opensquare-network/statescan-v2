const { chainCall } = require("../../../chainApi");

function getNominatorStakeInExposure(exposure, nominatorAddress) {
  if (!exposure?.others?.length) {
    return "0";
  }

  const nominatorStake = exposure.others.find(
    ({ who }) => who === nominatorAddress,
  );
  return nominatorStake ? nominatorStake.value.toString() : "0";
}

async function queryValidatorCommission(api, validatorAddress) {
  const validatorPrefs = await api.query.staking.validators(validatorAddress);
  const { commission } = validatorPrefs?.toJSON() || {};
  return commission ? commission.toString() : "0";
}

async function queryValidatorEraStakingData(api, eraIndex, validatorAddress) {
  const [exposureResult, stakersOverviewResult] = await Promise.all([
    api.query.staking.erasStakersPaged(eraIndex, validatorAddress, null),
    api.query.staking.erasStakersOverview(eraIndex, validatorAddress),
  ]);

  const exposure = exposureResult?.toJSON() || {};
  const normalizedStakerOverview = stakersOverviewResult?.toJSON() || {};
  const active = !stakersOverviewResult?.isNone;

  return {
    exposure,
    normalizedStakerOverview,
    active,
  };
}

async function buildValidatorInfoForNominator(
  api,
  eraIndex,
  validatorAddress,
  nominatorAddress,
) {
  const commission = await queryValidatorCommission(api, validatorAddress);
  const { exposure, normalizedStakerOverview, active } =
    await queryValidatorEraStakingData(api, eraIndex, validatorAddress);

  const nominator_stake = getNominatorStakeInExposure(
    exposure,
    nominatorAddress,
  );

  return {
    address: validatorAddress,
    commission,
    active,
    nominator_stake,
    self_stake: normalizedStakerOverview?.own
      ? normalizedStakerOverview.own.toString()
      : "0",
    total_stake: normalizedStakerOverview?.total
      ? normalizedStakerOverview.total.toString()
      : "0",
    nominator_count: normalizedStakerOverview?.nominatorCount || 0,
  };
}

async function queryNominatorAndCurrentEra(api, address) {
  const [nominatorInfo, currentEra] = await Promise.all([
    api.query.staking.nominators(address),
    api.query.staking.currentEra(),
  ]);

  const eraIndex = currentEra.toJSON();

  if (!nominatorInfo || nominatorInfo.isNone || !eraIndex) {
    return null;
  }

  const { targets: validators } = nominatorInfo.toJSON();
  return { validators, eraIndex };
}

async function stakingNominations(_, _args) {
  const { address } = _args;

  try {
    return await chainCall(async (api) => {
      const nominatorData = await queryNominatorAndCurrentEra(api, address);

      if (!nominatorData) {
        return null;
      }

      const { validators, eraIndex } = nominatorData;

      const validatorInfos = await Promise.all(
        validators.map(async (validator) => {
          const validatorAddress = validator.toString();
          return buildValidatorInfoForNominator(
            api,
            eraIndex,
            validatorAddress,
            address,
          );
        }),
      );

      return {
        validators: validatorInfos,
      };
    });
  } catch (error) {
    console.error(error);
    return null;
  }
}

module.exports = {
  stakingNominations,
};
