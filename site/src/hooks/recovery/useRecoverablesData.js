import { useRecoveryQuery } from "../../hooks/apollo";
import { useRecoverablesParams } from "../../hooks/recovery/useRecoverablesParams";
import { GET_RECOVERABLES } from "../../services/gql/recovery";
import {
  LIST_DEFAULT_PAGE_SIZE,
  RECOVERABLE_STATUS,
} from "../../utils/constants";

export function useRecoverablesData() {
  const { account, status, page = 1 } = useRecoverablesParams();
  const pageSize = LIST_DEFAULT_PAGE_SIZE;

  const active =
    status === RECOVERABLE_STATUS.ACTIVE
      ? true
      : status === RECOVERABLE_STATUS.INACTIVE
      ? false
      : null;

  const { data, ...rest } = useRecoveryQuery(GET_RECOVERABLES, {
    variables: {
      limit: pageSize,
      offset: (page - 1) * pageSize,
      active,
      lostAccount: account,
    },
  });

  return { data: data?.recoverables, ...rest };
}
