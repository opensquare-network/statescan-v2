import { useRecoveryQuery } from "../../hooks/apollo";
import { GET_RECOVERY_PROXIES } from "../../services/gql/recovery";
import { LIST_DEFAULT_PAGE_SIZE } from "../../utils/constants";
import { useQueryParams } from "../useQueryParams";

export function useRecoveryProxiesData() {
  const { page = 1 } = useQueryParams();
  const pageSize = LIST_DEFAULT_PAGE_SIZE;
  const { data, ...rest } = useRecoveryQuery(GET_RECOVERY_PROXIES, {
    variables: {
      limit: pageSize,
      offset: (page - 1) * pageSize,
    },
  });

  return { data: data?.recoveryProxies, ...rest };
}
