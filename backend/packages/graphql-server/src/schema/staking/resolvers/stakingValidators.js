const { chainCall } = require("../../../chainApi");
const isEmpty = require("lodash.isempty");

async function stakingValidators(_, _args) {
  const { address } = _args;

  return await chainCall(async (api) => {
    const nominatorInfo = await api.query.staking.nominators(address);
    const currentEra = await api.query.staking.currentEra();
    const eraIndex = currentEra.toJSON();

    if (!nominatorInfo || nominatorInfo.isNone || !eraIndex) {
      return null;
    }

    const { targets: validators } = nominatorInfo.toJSON();
    const validatorInfos = await Promise.all(
      validators.map(async (validator) => {
        const validatorAddress = validator.toString();
        const validatorPrefs = await api.query.staking.validators(
          validatorAddress,
        );
        const { commission, blocked } = validatorPrefs?.toJSON() || {};
        const [exposureResult, stakersOverviewResult] = await Promise.all([
          api.query.staking.erasStakersPaged(eraIndex, validatorAddress, null),
          api.query.staking.erasStakersOverview(eraIndex, validatorAddress),
        ]);

        const exposure = exposureResult?.toJSON() || {};
        const normalizedStakerOverview = stakersOverviewResult?.toJSON() || {};

        let bonded = "0";
        if (exposure && exposure?.others && exposure?.others?.length > 0) {
          exposure.others.forEach(({ who, value }) => {
            if (who === address) {
              bonded = value.toString();
              return;
            }
          });
        }

        return {
          address: validatorAddress,
          commission,
          active: !isEmpty(normalizedStakerOverview) && !blocked,
          bonded,
          bonded_owner: normalizedStakerOverview?.own || "0",
          bonded_nominators: normalizedStakerOverview?.total || "0",
          nominator_count: normalizedStakerOverview?.nominatorCount || 0,
        };
      }),
    );

    return {
      nominator: address,
      validators: validatorInfos,
    };
  });
}

module.exports = {
  stakingValidators,
};
