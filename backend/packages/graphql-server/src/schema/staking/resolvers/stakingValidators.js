const { chainCall } = require("../../../chainApi");
const isEmpty = require("lodash.isempty");

// todos: filter、sort
async function stakingValidators(_, _args) {
  const { offset = 0, limit = 20, address } = _args;

  try {
    return await chainCall(async (api) => {
      const currentEra = await api.query.staking.currentEra();
      const eraIndex = currentEra.toJSON();

      if (!eraIndex) {
        return {
          items: [],
          offset,
          limit,
          total: 0,
        };
      }

      const allValidators = await api.query.staking.validators.entries();

      let filteredValidators = allValidators;
      if (address) {
        filteredValidators = allValidators.filter(([key]) => {
          const validatorAddress = key.args[0].toString();
          return validatorAddress.toLowerCase().includes(address.toLowerCase());
        });
      }

      const total = filteredValidators.length;

      const paginatedValidators = filteredValidators.slice(
        offset,
        offset + limit,
      );

      const validatorInfos = await Promise.all(
        paginatedValidators.map(async ([key, validatorPrefs]) => {
          const validatorAddress = key.args[0].toString();
          const { commission, blocked } = validatorPrefs?.toJSON() || {};

          const stakersOverviewResult =
            await api.query.staking.erasStakersOverview(
              eraIndex,
              validatorAddress,
            );

          const normalizedStakerOverview =
            stakersOverviewResult?.toJSON() || {};

          return {
            address: validatorAddress,
            commission: commission ? commission.toString() : "0",
            active: !isEmpty(normalizedStakerOverview) && !blocked,
            self_stake: normalizedStakerOverview?.own
              ? normalizedStakerOverview.own.toString()
              : "0",
            total_stake: normalizedStakerOverview?.total
              ? normalizedStakerOverview.total.toString()
              : "0",
            nominator_count: normalizedStakerOverview?.nominatorCount || 0,
          };
        }),
      );

      return {
        items: validatorInfos,
        offset,
        limit,
        total,
      };
    });
  } catch (error) {
    console.error("Error in stakingValidators:", error);
    return {
      items: [],
      offset,
      limit,
      total: 0,
    };
  }
}

module.exports = {
  stakingValidators,
};
