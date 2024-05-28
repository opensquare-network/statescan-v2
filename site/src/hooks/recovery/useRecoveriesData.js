import { useRecoveryQuery } from "../../hooks/apollo";
import { useRecoverablesParams } from "../../hooks/recovery/useRecoverablesParams";
import { GET_RECOVERIES } from "../../services/gql/recovery";
import { LIST_DEFAULT_PAGE_SIZE } from "../../utils/constants";

export function useRecoveriesData() {
  const { account, status, page = 1 } = useRecoverablesParams();
  const pageSize = LIST_DEFAULT_PAGE_SIZE;
  const { data, ...rest } = useRecoveryQuery(GET_RECOVERIES, {
    variables: {
      limit: pageSize,
      offset: (page - 1) * pageSize,
      active: status,
      lostAccount: account,
    },
  });

  return { data: data?.recoveries, ...rest };
}
