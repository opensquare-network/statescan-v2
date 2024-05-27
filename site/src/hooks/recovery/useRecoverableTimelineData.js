import { GET_RECOVERABLE_TIMELINE } from "../../services/gql/recovery";
import { LIST_DEFAULT_PAGE_SIZE } from "../../utils/constants";
import { useRecoverableParams } from "../../utils/hooks/recovery/useRecoverableParams";
import { useRecoveryQuery } from "../apollo";

export function useRecoverableTimelineData() {
  const { address, height } = useRecoverableParams();
  const { data, ...rest } = useRecoveryQuery(GET_RECOVERABLE_TIMELINE, {
    variables: {
      recoverableHeight: height,
      lostAccount: address,
      offset: 0,
      limit: LIST_DEFAULT_PAGE_SIZE,
    },
  });

  return {
    data: data?.recoverableTimeline,
    ...rest,
  };
}
