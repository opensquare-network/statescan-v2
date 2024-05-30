import { GET_RECOVERABLE } from "../../services/gql/recovery";
import { useRecoverableParams } from "./useRecoverableParams";
import { useRecoveryQuery } from "../apollo";

export function useRecoverableData() {
  const { address, height } = useRecoverableParams();

  const { data, ...rest } = useRecoveryQuery(GET_RECOVERABLE, {
    variables: {
      height,
      lostAccount: address,
    },
  });

  return {
    data: data?.recoverable,
    ...rest,
  };
}
