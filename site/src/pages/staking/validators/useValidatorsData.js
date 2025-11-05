import { useEffect, useState, useMemo } from "react";
import { useStakingQuery } from "../../../hooks/apollo";
import { GET_STAKING_VALIDATORS } from "../../../services/gqls";
import { useQueryParams } from "../../../hooks/useQueryParams";
import useChainSettings from "../../../utils/hooks/chain/useChainSettings";
import { fetchIdentity } from "../../../hooks/useIdentity";
import { isAddress } from "@polkadot/util-crypto";
import BigNumber from "bignumber.js";

export function useRawValidators() {
  const { sort } = useQueryParams();

  let sortField, sortDirection;
  if (sort) {
    const parts = sort.split("_");
    if (parts.length >= 2) {
      sortDirection = parts.pop();
      sortField = parts.join("_");
    }
  }

  const { data, loading } = useStakingQuery(GET_STAKING_VALIDATORS, {
    variables: {
      sortField,
      sortDirection,
    },
  });

  return {
    data: data?.stakingValidators,
    loading,
  };
}

export function useValidatorsWithIdentity(rawValidators) {
  const chainSettings = useChainSettings();
  const [validatorsWithIdentity, setValidatorsWithIdentity] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!rawValidators?.items) {
      setValidatorsWithIdentity(null);
      return;
    }

    const validators = rawValidators.items;
    setLoading(true);

    const fetchAllIdentities = async () => {
      const identitiesMap = {};

      await Promise.all(
        validators.map(async (validator) => {
          try {
            const identity = await fetchIdentity(
              chainSettings.identity,
              validator.address,
            );
            if (identity?.info?.display) {
              identitiesMap[validator.address] = identity.info.display;
            }
          } catch (err) {
            throw new Error(
              `Failed to fetch identity for ${validator.address}:`,
              err,
            );
          }
        }),
      );

      const validatorsWithIdentities = validators.map((validator) => ({
        ...validator,
        identity: identitiesMap[validator.address] || null,
      }));

      const enrichedData = {
        items: validatorsWithIdentities,
        total: rawValidators.total,
      };

      setValidatorsWithIdentity(enrichedData);
      setLoading(false);
    };

    fetchAllIdentities();
  }, [rawValidators, chainSettings.identity]);

  return {
    data: validatorsWithIdentity,
    loading,
  };
}

export function useFilteredValidators(fullData, filters) {
  const { search, onlyActive, no100Commission, hasIdentityOnly } = filters;

  return useMemo(() => {
    if (!fullData?.items) {
      return { items: [], total: 0 };
    }

    let filteredItems = [...fullData.items];

    if (search) {
      const searchLower = String(search).toLowerCase();
      const isSearchAddr = isAddress(search);

      filteredItems = filteredItems.filter((validator) => {
        if (isSearchAddr) {
          return validator.address.toLowerCase().includes(searchLower);
        }
        return validator.identity?.toLowerCase().includes(searchLower);
      });
    }

    if (onlyActive === "Yes") {
      filteredItems = filteredItems.filter((validator) => validator.active);
    }

    if (no100Commission === "Yes") {
      filteredItems = filteredItems.filter((validator) => {
        const commission = new BigNumber(validator.commission || "0");
        const maxCommission = new BigNumber("1000000000");
        return !commission.isEqualTo(maxCommission);
      });
    }

    if (hasIdentityOnly === "Yes") {
      filteredItems = filteredItems.filter((validator) => validator.identity);
    }

    return {
      items: filteredItems,
      total: filteredItems.length,
    };
  }, [fullData, search, onlyActive, no100Commission, hasIdentityOnly]);
}

export function usePaginatedValidators(filteredData, page, pageSize) {
  return useMemo(() => {
    if (!filteredData?.items) {
      return { items: [], total: 0 };
    }

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedItems = filteredData.items.slice(startIndex, endIndex);

    return {
      items: paginatedItems,
      total: filteredData.total,
    };
  }, [filteredData, page, pageSize]);
}
