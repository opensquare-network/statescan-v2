import { useRecoveryQuery } from "../../hooks/apollo";
import { useRecoverablesParams } from "../../hooks/recovery/useRecoverablesParams";
import { GET_RECOVERIES } from "../../services/gql/recovery";
import { LIST_DEFAULT_PAGE_SIZE, RECOVERY_STATUS } from "../../utils/constants";

export function useRecoveriesData() {
  const { account, status, page = 1 } = useRecoverablesParams();
  const pageSize = LIST_DEFAULT_PAGE_SIZE;

  const active =
    status === RECOVERY_STATUS.ACTIVE
      ? true
      : status === RECOVERY_STATUS.CLOSED
      ? false
      : null;

  const { data, ...rest } = useRecoveryQuery(GET_RECOVERIES, {
    variables: {
      limit: pageSize,
      offset: (page - 1) * pageSize,
      active,
      lostAccount: account,
    },
  });

  return { data: data?.recoveries, ...rest };
}
