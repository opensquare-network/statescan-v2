import { GET_LIDO_WITHDRAWAL_QUEUE_FINALIZATIONS } from "../../services/gql/lido";
import { useLidoServerListQuery } from "./useLidoList";
import { useLidoServerIndexerFilterVariables } from "./useLidoListVariables";

export function useLidoWithdrawalQueueFinalizationsData() {
  const variables = useLidoServerIndexerFilterVariables();

  return useLidoServerListQuery({
    query: GET_LIDO_WITHDRAWAL_QUEUE_FINALIZATIONS,
    field: "withdrawalFinalized",
    variables,
  });
}
