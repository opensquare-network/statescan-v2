import { useStakingQuery } from "../../../hooks/apollo";
import { GET_STAKING_VALIDATORS } from "../../../services/gqls";
import { LIST_DEFAULT_PAGE_SIZE } from "../../../utils/constants";
import { useQueryParams } from "../../../hooks/useQueryParams";
import { isAddress } from "@polkadot/util-crypto";

export function useValidatorsData({ onCompleted } = {}) {
  const {
    page = 1,
    search = "",
    sort,
    onlyActive = "Yes",
    no100Commission = "Yes",
    hasIdentityOnly = "Yes",
  } = useQueryParams();

  const pageSize = LIST_DEFAULT_PAGE_SIZE;

  const isSearchAddress = isAddress(search);
  const address = isSearchAddress ? search : undefined;
  const identitySearch = !isSearchAddress && search ? search : undefined;

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
        limit: pageSize,
        offset: (page - 1) * pageSize,
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
