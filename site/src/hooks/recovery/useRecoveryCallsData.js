import { GET_RECOVERY_CALLS } from "../../services/gql/recovery";
import { LIST_DEFAULT_PAGE_SIZE } from "../../utils/constants";
import { useRecoveryParams } from "./useRecoveryParams";
import { useRecoveryQuery } from "../apollo";

export function useRecoveryCallsData() {
  const { address, rescuer, height, page = 1 } = useRecoveryParams();
  const pageSize = LIST_DEFAULT_PAGE_SIZE;
  const { data, ...rest } = useRecoveryQuery(GET_RECOVERY_CALLS, {
    variables: {
      recoveryCreatedAt: height,
      lostAccount: address,
      rescuerAccount: rescuer,
      offset: (page - 1) * pageSize,
      limit: pageSize,
    },
  });

  return {
    data: data?.recoveryCalls,
    ...rest,
  };
}
