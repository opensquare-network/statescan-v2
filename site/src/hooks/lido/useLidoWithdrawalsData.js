import { EMPTY_OBJECT, TABLE_SORT_QUERY_KEY } from "../../utils/constants";
import { GET_LIDO_WITHDRAWAL_REQUESTS } from "../../services/gql/lido";
import { useQueryParams } from "../useQueryParams";
import { useLidoList } from "./useLidoList";
import { pickLidoFilters } from "./utils";

export function useLidoWithdrawalsData() {
  const queryParams = useQueryParams({ parseNumbers: false });
  const params = queryParams || EMPTY_OBJECT;
  const {
    cursor,
    [TABLE_SORT_QUERY_KEY]: sortQuery,
    status: statusQuery = "",
    txHash = "",
    time_dimension: timeDimension = "block",
    block_start: blockStart,
    block_end: blockEnd,
    date_start: dateStart,
    date_end: dateEnd,
  } = params;

  return useLidoList({
    query: GET_LIDO_WITHDRAWAL_REQUESTS,
    field: "withdrawalRequests",
    sortQuery,
    cursor,
    where: pickLidoFilters({
      status: statusQuery,
      txHash,
    }),
    timeDimensionParams: {
      timeDimension,
      blockStart,
      blockEnd,
      dateStart,
      dateEnd,
    },
  });
}
