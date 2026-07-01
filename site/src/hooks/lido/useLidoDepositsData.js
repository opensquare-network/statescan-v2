import { GET_LIDO_SERVER_DEPOSITS } from "../../services/gql/lido";
import { EMPTY_OBJECT } from "../../utils/constants";
import { useLidoServerListQuery } from "./useLidoList";
import { useLidoServerFilterVariables } from "./useLidoListVariables";

export function useLidoDepositsData(options = EMPTY_OBJECT) {
  const filters = options.filters || EMPTY_OBJECT;
  const variables = useLidoServerFilterVariables({
    address: filters.address,
  });

  return useLidoServerListQuery({
    query: GET_LIDO_SERVER_DEPOSITS,
    field: "deposits",
    variables,
  });
}
