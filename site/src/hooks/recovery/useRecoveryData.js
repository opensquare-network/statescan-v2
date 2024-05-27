import { GET_RECOVERY } from "../../services/gql/recovery";
import { useRecoveryParams } from "../../utils/hooks/recovery/useRecoveryParams";
import { useRecoveryQuery } from "../apollo";

export function useRecoveryData() {
  const { address, rescuer, height } = useRecoveryParams();

  const { data, ...rest } = useRecoveryQuery(GET_RECOVERY, {
    variables: {
      created: height,
      lostAccount: address,
      rescuerAccount: rescuer,
    },
  });

  return {
    data: data?.recovery,
    ...rest,
  };
}
