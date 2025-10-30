const { chainCall } = require("../../../chainApi");
const isEmpty = require("lodash.isempty");

function sortValidators(validators, sortField, sortDirection) {
  if (!sortField) return validators;

  return validators.sort((a, b) => {
    let aValue, bValue;

    switch (sortField) {
      case "nominator_count":
        aValue = a.nominator_count;
        bValue = b.nominator_count;
        break;
      case "total_stake":
        aValue = BigInt(a.total_stake || "0");
        bValue = BigInt(b.total_stake || "0");
        break;
      case "self_stake":
        aValue = BigInt(a.self_stake || "0");
        bValue = BigInt(b.self_stake || "0");
        break;
      case "commission":
        aValue = BigInt(a.commission || "0");
        bValue = BigInt(b.commission || "0");
        break;
      default:
        return 0;
    }

    let comparison;
    if (typeof aValue === "bigint" && typeof bValue === "bigint") {
      if (aValue < bValue) comparison = -1;
      else if (aValue > bValue) comparison = 1;
      else comparison = 0;
    } else {
      comparison = aValue - bValue;
    }

    return sortDirection === "DESC" ? -comparison : comparison;
  });
}

// todo: filter
async function stakingValidators(_, _args) {
  const {
    offset = 0,
    limit = 20,
    address,
    sortField = "",
    sortDirection = "",
  } = _args;

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

      const validatorInfos = await Promise.all(
        filteredValidators.map(async ([key, validatorPrefs]) => {
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

      const sortedValidators = sortValidators(
        validatorInfos,
        sortField,
        sortDirection,
      );

      const total = sortedValidators.length;

      const paginatedValidators = sortedValidators.slice(
        offset,
        offset + limit,
      );

      return {
        items: paginatedValidators,
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
