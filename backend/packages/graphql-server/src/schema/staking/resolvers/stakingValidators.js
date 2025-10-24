const { chainCall } = require("../../../chainApi");

async function stakingValidators(_, _args) {
  const { address } = _args;

  return await chainCall(async (api) => {
    const nominatorInfo = await api.query.staking.nominators(address);
    if (!nominatorInfo || nominatorInfo.isNone) {
      return null;
    }
    const { targets: validators } = nominatorInfo.toJSON();
    const currentEra = await api.query.staking.currentEra();
    const eraIndex = currentEra.toJSON();

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
        const { own, total, nominatorCount } =
          stakersOverviewResult?.toJSON() || {};

        // TODO: My Share
        let myShare = "0";
        // if (exposure && exposure?.others && exposure?.others?.length > 0) {
        //   exposure.others.forEach(({ who, value }) => {
        //     if (who === address) {
        //       const total = exposure?.pageTotal?.toString() || "0";
        //       myShare = new BigNumber(value.toString()).dividedBy(total).toFixed(4);
        //       return;
        //     }
        //   });
        // }

        return {
          address: validatorAddress,
          commission,
          blocked,
          myShare,
          validatorBonded: own,
          totalBonded: total,
          nominatorCount,
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
