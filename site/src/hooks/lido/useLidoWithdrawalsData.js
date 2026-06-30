import { GET_LIDO_WITHDRAWALS } from "../../services/gql/lido";
import { EMPTY_OBJECT } from "../../utils/constants";
import { useLidoServerListQuery } from "./useLidoList";
import { useLidoServerIndexerFilterVariables } from "./useLidoListVariables";
import { pickLidoFilters } from "./utils";

export function useLidoWithdrawalsData(options = EMPTY_OBJECT) {
  const variables = useLidoServerIndexerFilterVariables({
    variables: pickLidoFilters({
      status: options.filters?.status,
    }),
  });

  return useLidoServerListQuery({
    query: GET_LIDO_WITHDRAWALS,
    field: "withdrawals",
    variables,
  });
}
