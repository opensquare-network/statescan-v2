import { useStakingQuery } from "../../../hooks/apollo";
import { GET_STAKING_VALIDATORS } from "../../../services/gqls";
import { useQueryParams } from "../../../hooks/useQueryParams";
import { isAddress } from "@polkadot/util-crypto";

export function useValidatorsData({ onCompleted } = {}) {
  const {
    search = "",
    sort,
    onlyActive = "Yes",
    no100Commission = "Yes",
    hasIdentityOnly = "Yes",
  } = useQueryParams();

  const isSearchAddress = isAddress(search);
  const address = isSearchAddress ? search : undefined;
  const identitySearch =
    !isSearchAddress && search ? String(search) : undefined;

  const onlyActiveBool = onlyActive === "Yes";
  const no100CommissionBool = no100Commission === "Yes";
  const hasIdentityOnlyBool = hasIdentityOnly === "Yes";

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
        address,
        sortField,
        sortDirection,
        onlyActive: onlyActiveBool,
        no100Commission: no100CommissionBool,
        identitySearch,
        hasIdentityOnly: hasIdentityOnlyBool,
      },
      onCompleted,
    },
  );

  return {
    data: data?.stakingValidators,
    loading,
    error,
    refetch,
  };
}
