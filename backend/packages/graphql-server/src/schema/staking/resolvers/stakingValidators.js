const { chainCall } = require("../../../chainApi");
const {
  identity: { getIdentityCol },
} = require("@statescan/mongo");

async function getCurrentEraIndex(api) {
  const currentEra = await api.query.staking.currentEra();
  return currentEra.toJSON();
}

async function getAllValidatorsFromChain(api) {
  return await api.query.staking.validators.entries();
}

async function getValidatorsIdentities(addresses) {
  if (!addresses || addresses.length === 0) {
    return {};
  }

  try {
    const identityCol = await getIdentityCol();
    const identities = await identityCol
      .find(
        { account: { $in: addresses } },
        { projection: { account: 1, fullDisplay: 1, _id: 0 } },
      )
      .toArray();

    const identityMap = {};
    identities.forEach((identity) => {
      identityMap[identity.account] = identity.fullDisplay;
    });

    return identityMap;
  } catch (error) {
    console.error("Error fetching validators identities:", error);
    return {};
  }
}

async function buildValidatorInfo(api, validatorEntry, eraIndex) {
  const [key, validatorPrefs] = validatorEntry;
  const validatorAddress = key.args[0].toString();
  const { commission } = validatorPrefs?.toJSON() || {};

  const stakersOverviewResult = await api.query.staking.erasStakersOverview(
    eraIndex,
    validatorAddress,
  );

  const normalizedStakerOverview = stakersOverviewResult?.toJSON() || {};
  const active = !stakersOverviewResult?.isNone;

  return {
    address: validatorAddress,
    commission: commission ? commission.toString() : "0",
    active,
    self_stake: normalizedStakerOverview?.own
      ? normalizedStakerOverview.own.toString()
      : "0",
    total_stake: normalizedStakerOverview?.total
      ? normalizedStakerOverview.total.toString()
      : "0",
    nominator_count: normalizedStakerOverview?.nominatorCount || 0,
  };
}

function filterValidatorsByAddress(validatorEntries, addressFilter) {
  if (!addressFilter) {
    return validatorEntries;
  }

  return validatorEntries.filter(([key]) => {
    const validatorAddress = key.args[0].toString();
    return validatorAddress.toLowerCase().includes(addressFilter.toLowerCase());
  });
}

function filterValidatorsByActiveStatus(validators, onlyActive) {
  if (!onlyActive) {
    return validators;
  }

  return validators.filter((validator) => validator.active === true);
}

function filterValidatorsByCommission(validators, no100Commission) {
  if (!no100Commission) {
    return validators;
  }

  return validators.filter((validator) => {
    const commissionValue = BigInt(validator.commission || "0");
    return commissionValue !== BigInt("1000000000");
  });
}

async function filterValidatorsByIdentity(
  validators,
  identitySearch,
  hasIdentityOnly,
  existingIdentitiesMap = null,
) {
  if (!identitySearch && hasIdentityOnly === undefined) {
    return {
      filteredValidators: validators,
      identitiesMap: existingIdentitiesMap,
    };
  }

  let identitiesMap = existingIdentitiesMap;
  if (!identitiesMap) {
    const validatorAddresses = validators.map((validator) => validator.address);
    identitiesMap = await getValidatorsIdentities(validatorAddresses);
  }

  const filteredValidators = validators.filter((validator) => {
    const identity = identitiesMap[validator.address];

    if (hasIdentityOnly === true) {
      if (!identity) {
        return false;
      }
    }

    if (identitySearch && identity) {
      const searchTerm = identitySearch.toLowerCase();
      const identityDisplay = identity.toLowerCase();
      if (!identityDisplay.includes(searchTerm)) {
        return false;
      }
    } else if (identitySearch && !identity) {
      return false;
    }

    return true;
  });

  return { filteredValidators, identitiesMap };
}

function sortValidators(validators, sortField, sortDirection) {
  if (!sortField) return validators;

  return validators.sort((a, b) => {
    let aValue, bValue;

    switch (sortField) {
      case "NOMINATOR_COUNT":
        aValue = a.nominator_count;
        bValue = b.nominator_count;
        break;
      case "TOTAL_STAKE":
        aValue = BigInt(a.total_stake || "0");
        bValue = BigInt(b.total_stake || "0");
        break;
      case "SELF_STAKE":
        aValue = BigInt(a.self_stake || "0");
        bValue = BigInt(b.self_stake || "0");
        break;
      case "COMMISSION":
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

function attachIdentityToValidators(validators, identitiesMap) {
  return validators.map((validator) => ({
    ...validator,
    identity: identitiesMap[validator.address] || null,
  }));
}

function paginateResults(items, offset, limit) {
  const total = items.length;
  const paginatedItems = items.slice(offset, offset + limit);

  return {
    items: paginatedItems,
    offset,
    limit,
    total,
  };
}

async function buildAllValidatorsInfo(api, eraIndex, addressFilter) {
  const allValidatorEntries = await getAllValidatorsFromChain(api);
  const filteredEntries = filterValidatorsByAddress(
    allValidatorEntries,
    addressFilter,
  );
  const validatorInfos = await Promise.all(
    filteredEntries.map((entry) => buildValidatorInfo(api, entry, eraIndex)),
  );

  return validatorInfos;
}

async function applyAllFilters(validators, filters) {
  const { onlyActive, no100Commission, identitySearch, hasIdentityOnly } =
    filters;

  let filteredValidators = filterValidatorsByActiveStatus(
    validators,
    onlyActive,
  );
  filteredValidators = filterValidatorsByCommission(
    filteredValidators,
    no100Commission,
  );

  const { filteredValidators: identityFiltered, identitiesMap } =
    await filterValidatorsByIdentity(
      filteredValidators,
      identitySearch,
      hasIdentityOnly,
    );

  return { filteredValidators: identityFiltered, identitiesMap };
}

async function processFinalResults(validators, identitiesMap, options) {
  const { sortField, sortDirection, offset, limit } = options;

  const sortedValidators = sortValidators(validators, sortField, sortDirection);

  let finalIdentitiesMap = identitiesMap;
  if (!finalIdentitiesMap) {
    const validatorAddresses = sortedValidators.map(
      (validator) => validator.address,
    );
    finalIdentitiesMap = await getValidatorsIdentities(validatorAddresses);
  }

  const validatorsWithIdentity = attachIdentityToValidators(
    sortedValidators,
    finalIdentitiesMap,
  );

  return paginateResults(validatorsWithIdentity, offset, limit);
}

async function stakingValidators(_, _args) {
  const {
    offset = 0,
    limit = 20,
    address,
    sortField = "",
    sortDirection = "",
    onlyActive = false,
    no100Commission = false,
    identitySearch,
    hasIdentityOnly,
  } = _args;

  try {
    return await chainCall(async (api) => {
      const eraIndex = await getCurrentEraIndex(api);
      if (!eraIndex) {
        return paginateResults([], offset, limit);
      }

      const allValidators = await buildAllValidatorsInfo(
        api,
        eraIndex,
        address,
      );

      const filters = {
        onlyActive,
        no100Commission,
        identitySearch,
        hasIdentityOnly,
      };
      const { filteredValidators, identitiesMap } = await applyAllFilters(
        allValidators,
        filters,
      );

      const options = { sortField, sortDirection, offset, limit };
      return await processFinalResults(
        filteredValidators,
        identitiesMap,
        options,
      );
    });
  } catch (error) {
    console.error("Error in stakingValidators:", error);
    return paginateResults([], offset, limit);
  }
}

module.exports = {
  stakingValidators,
};
