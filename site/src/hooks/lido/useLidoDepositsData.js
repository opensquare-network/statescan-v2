import { GET_LIDO_DEPOSITS } from "../../services/gql/lido";
import { useLidoServerListQuery } from "./useLidoList";
import { useLidoServerIndexerFilterVariables } from "./useLidoListVariables";

export function useLidoDepositsData() {
  const variables = useLidoServerIndexerFilterVariables();

  return useLidoServerListQuery({
    query: GET_LIDO_DEPOSITS,
    field: "deposits",
    variables,
  });
}
