import { useEffect, useState } from "react";
import { useStakingQuery } from "../../../hooks/apollo";
import { GET_STAKING_VALIDATORS } from "../../../services/gqls";
import { useQueryParams } from "../../../hooks/useQueryParams";
import useChainSettings from "../../../utils/hooks/chain/useChainSettings";
import { fetchIdentity } from "../../../hooks/useIdentity";

export function useValidatorsData({ onCompleted } = {}) {
  const { sort } = useQueryParams();
  const chainSettings = useChainSettings();
  const [validatorsWithIdentity, setValidatorsWithIdentity] = useState(null);
  const [identitiesLoading, setIdentitiesLoading] = useState(false);

  let sortField, sortDirection;
  if (sort) {
    const parts = sort.split("_");
    if (parts.length >= 2) {
      sortDirection = parts.pop();
      sortField = parts.join("_");
    }
  }

  const { data, loading, error, refetch } = useStakingQuery(
    GET_STAKING_VALIDATORS,
    {
      variables: {
        sortField,
        sortDirection,
      },
      fetchPolicy: "cache-and-network",
    },
  );

  useEffect(() => {
    if (!data?.stakingValidators?.items) {
      return;
    }

    const validators = data.stakingValidators.items;
    setIdentitiesLoading(true);

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
        total: data.stakingValidators.total,
      };

      setValidatorsWithIdentity(enrichedData);
      setIdentitiesLoading(false);
      onCompleted?.(enrichedData);
    };

    fetchAllIdentities();
  }, [data, chainSettings.identity, onCompleted]);

  return {
    data: validatorsWithIdentity,
    loading: loading || identitiesLoading,
    error,
    refetch,
  };
}
