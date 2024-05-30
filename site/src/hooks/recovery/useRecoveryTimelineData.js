import { GET_RECOVERY_TIMELINE } from "../../services/gql/recovery";
import { LIST_DEFAULT_PAGE_SIZE } from "../../utils/constants";
import { useRecoveryParams } from "./useRecoveryParams";
import { useRecoveryQuery } from "../apollo";

export function useRecoveryTimelineData() {
  const { address, rescuer, height } = useRecoveryParams();
  const { data, ...rest } = useRecoveryQuery(GET_RECOVERY_TIMELINE, {
    variables: {
      created: height,
      lostAccount: address,
      rescuerAccount: rescuer,
      offset: 0,
      limit: LIST_DEFAULT_PAGE_SIZE,
    },
  });

  return {
    data: data?.recoveryTimeline,
    ...rest,
  };
}
