import { useStakingQuery } from "../../../hooks/apollo";
import { GET_STAKING_VALIDATORS } from "../../../services/gqls";
import { LIST_DEFAULT_PAGE_SIZE } from "../../../utils/constants";
import { useQueryParams } from "../../../hooks/useQueryParams";

// TODO: search & filter
export function useValidatorsData({ onCompleted } = {}) {
  const {
    page = 1,
    address,
    sortField,
    sortDirection,
    onlyActive,
    no100Commission,
    identitySearch,
    hasIdentityOnly,
  } = useQueryParams();
  
  const pageSize = LIST_DEFAULT_PAGE_SIZE;

  const { data, loading, error, refetch } = useStakingQuery(GET_STAKING_VALIDATORS, {
    variables: {
      limit: pageSize,
      offset: (page - 1) * pageSize,
      address,
      sortField,
      sortDirection,
      onlyActive,
      no100Commission,
      identitySearch,
      hasIdentityOnly,
    },
    onCompleted,
  });

  return {
    data: data?.stakingValidators,
    loading,
    error,
    refetch,
  };
}
