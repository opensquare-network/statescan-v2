import { GET_RECOVERABLE_COUNTS } from "../../services/gql/recovery";
import { useRecoveryQuery } from "../apollo";
import { useRecoverableParams } from "./useRecoverableParams";

export function useRecoverableCountsData() {
  const { address, height } = useRecoverableParams();
  const { data, ...rest } = useRecoveryQuery(GET_RECOVERABLE_COUNTS, {
    variables: {
      lostAccount: address,
      recoverableHeight: height,
    },
  });

  return {
    data: {
      recoveries: data?.recoverableRecoveries?.total,
      calls: data?.recoverableCalls?.total,
    },
    ...rest,
  };
}
