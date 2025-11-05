const { chainCall } = require("../../../chainApi");
const {
  identity: { getIdentityCol },
} = require("@statescan/mongo");

async function fetchValidatorIdentities(addresses) {
  if (!addresses?.length) return {};

  try {
    const identityCol = await getIdentityCol();
    const identities = await identityCol
      .find(
        { account: { $in: addresses } },
        { projection: { account: 1, fullDisplay: 1, _id: 0 } },
      )
      .toArray();

    return identities.reduce((map, identity) => {
      map[identity.account] = identity.fullDisplay;
      return map;
    }, {});
  } catch (error) {
    console.error("Error fetching validators identities:", error);
    return {};
  }
}

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

function applyValidatorFilters(validators, filters) {
  const { onlyActive, no100Commission } = filters;

  return validators.filter((validator) => {
    if (onlyActive && !validator.active) return false;

    if (no100Commission) {
      return BigInt(validator.commission || "0") !== BigInt("1000000000");
    }

    return true;
  });
}

async function applyIdentityFilters(
  validators,
  filters,
  existingIdentitiesMap = null,
) {
  const { identitySearch, hasIdentityOnly } = filters;

  if (!identitySearch && hasIdentityOnly === undefined) {
    return { validators, identitiesMap: existingIdentitiesMap };
  }

  let identitiesMap = existingIdentitiesMap;
  if (!identitiesMap) {
    const addresses = validators.map((v) => v.address);
    identitiesMap = await fetchValidatorIdentities(addresses);
  }

  const filteredValidators = validators.filter((validator) => {
    const identity = identitiesMap[validator.address];

    if (hasIdentityOnly && !identity) return false;

    if (identitySearch) {
      if (!identity) return false;
      const searchTerm = identitySearch.toLowerCase();
      const identityDisplay = identity.toLowerCase();
      return identityDisplay.includes(searchTerm);
    }

    return true;
  });

  return { validators: filteredValidators, identitiesMap };
}

function addIdentityToValidators(validators, identitiesMap) {
  return validators.map((validator) => ({
    ...validator,
    identity: identitiesMap?.[validator.address] || null,
  }));
}

function createFullListResponse(items) {
  return {
    items,
    total: items.length,
  };
}

async function fetchAllValidators(api, eraIndex, addressFilter) {
  const allValidatorEntries = await api.query.staking.validators.entries();

  const filteredEntries = addressFilter
    ? allValidatorEntries.filter(([key]) => {
        const address = key.args[0].toString();
        return address.toLowerCase().includes(addressFilter.toLowerCase());
      })
    : allValidatorEntries;

  return Promise.all(
    filteredEntries.map((entry) => buildValidatorInfo(api, entry, eraIndex)),
  );
}

async function processValidatorData(validators, filters, options) {
  const { sortField, sortDirection } = options;

  let filteredValidators = applyValidatorFilters(validators, filters);

  const { validators: identityFilteredValidators, identitiesMap } =
    await applyIdentityFilters(filteredValidators, filters);

  const sortedValidators = sortValidatorsByField(
    identityFilteredValidators,
    sortField,
    sortDirection,
  );

  let finalIdentitiesMap = identitiesMap;
  if (!finalIdentitiesMap) {
    const addresses = sortedValidators.map((v) => v.address);
    finalIdentitiesMap = await fetchValidatorIdentities(addresses);
  }

  const validatorsWithIdentity = addIdentityToValidators(
    sortedValidators,
    finalIdentitiesMap,
  );

  return createFullListResponse(validatorsWithIdentity);
}

async function stakingValidators(_, args) {
  const {
    address,
    sortField = "",
    sortDirection = "",
    onlyActive = true,
    no100Commission = true,
    identitySearch,
    hasIdentityOnly = true,
  } = args;

  try {
    return await chainCall(async (api) => {
      const currentEra = await api.query.staking.currentEra();
      const eraIndex = currentEra.toJSON();

      if (!eraIndex) {
        return createFullListResponse([]);
      }

      const allValidators = await fetchAllValidators(api, eraIndex, address);

      const filters = {
        onlyActive,
        no100Commission,
        identitySearch,
        hasIdentityOnly,
      };
      const options = { sortField, sortDirection };

      return await processValidatorData(allValidators, filters, options);
    });
  } catch (error) {
    console.error("Error in stakingValidators:", error);
    return createFullListResponse([]);
  }
}

module.exports = {
  stakingValidators,
};
