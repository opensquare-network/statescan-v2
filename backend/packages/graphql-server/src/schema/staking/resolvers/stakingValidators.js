const { chainCall } = require("../../../chainApi");

async function buildValidatorInfo(api, validatorEntry, eraIndex) {
  const [key, validatorPrefs] = validatorEntry;
  const address = key.args[0].toString();
  const { commission } = validatorPrefs?.toJSON() || {};

  const stakersOverview = await api.query.staking.erasStakersOverview(
    eraIndex,
    address,
  );
  const overview = stakersOverview?.toJSON() || {};
  return {
    address,
    commission: commission?.toString() || "0",
    active: !stakersOverview?.isNone,
    self_stake: overview?.own?.toString() || "0",
    total_stake: overview?.total?.toString() || "0",
    nominator_count: overview?.nominatorCount || 0,
  };
}

function getValidatorSortValue(validator, sortField) {
  switch (sortField) {
    case "NOMINATOR_COUNT":
      return validator.nominator_count;
    case "TOTAL_STAKE":
      return BigInt(validator.total_stake || "0");
    case "SELF_STAKE":
      return BigInt(validator.self_stake || "0");
    case "COMMISSION":
      return BigInt(validator.commission || "0");
    default:
      return "0";
  }
}

function compareValues(a, b) {
  if (typeof a === "bigint" && typeof b === "bigint") {
    return a < b ? -1 : a > b ? 1 : 0;
  }
  return a - b;
}

function sortValidatorsByField(validators, sortField, sortDirection) {
  if (!sortField) return validators;

  return validators.sort((a, b) => {
    const aValue = getValidatorSortValue(a, sortField);
    const bValue = getValidatorSortValue(b, sortField);
    const comparison = compareValues(aValue, bValue);
    return sortDirection === "DESC" ? -comparison : comparison;
  });
}

function createFullListResponse(items) {
  return {
    items,
    total: items.length,
  };
}

async function fetchAllValidators(api, eraIndex) {
  const allValidatorEntries = await api.query.staking.validators.entries();
  return Promise.all(
    allValidatorEntries.map((entry) =>
      buildValidatorInfo(api, entry, eraIndex),
    ),
  );
}

async function processValidatorData(validators, options) {
  const { sortField, sortDirection } = options;

  const sortedValidators = sortValidatorsByField(
    validators,
    sortField,
    sortDirection,
  );

  return createFullListResponse(sortedValidators);
}

async function stakingValidators(_, args) {
  const { sortField = "", sortDirection = "" } = args;

  try {
    return await chainCall(async (api) => {
      const currentEra = await api.query.staking.currentEra();
      const eraIndex = currentEra.toJSON();

      if (!eraIndex) {
        return createFullListResponse([]);
      }

      const allValidators = await fetchAllValidators(api, eraIndex);

      const options = { sortField, sortDirection };

      return await processValidatorData(allValidators, options);
    });
  } catch (error) {
    console.error("Error in stakingValidators:", error);
    return createFullListResponse([]);
  }
}

module.exports = {
  stakingValidators,
};
