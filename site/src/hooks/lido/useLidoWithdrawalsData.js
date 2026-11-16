import { GET_LIDO_SERVER_WITHDRAWALS } from "../../services/gql/lido";
import { EMPTY_OBJECT } from "../../utils/constants";
import { useLidoServerListQuery } from "./useLidoList";
import { useLidoServerFilterVariables } from "./useLidoListVariables";
import { pickLidoFilters } from "./utils";

export function useLidoWithdrawalsData(options = EMPTY_OBJECT) {
  const filters = options.filters || EMPTY_OBJECT;
  const variables = useLidoServerFilterVariables({
    address: filters.address,
    variables: pickLidoFilters({
      status: filters.status,
    }),
    withSort: true,
    defaultSortQuery: "block_desc",
  });

  return useLidoServerListQuery({
    query: GET_LIDO_SERVER_WITHDRAWALS,
    field: "withdrawals",
    variables,
  });
}
