import { TABLE_SORT_QUERY_KEY } from "../../utils/constants";
import { GET_LIDO_WITHDRAWAL_QUEUE_FINALIZATIONS } from "../../services/gql/lido";
import { useQueryParams } from "../useQueryParams";
import { useLidoList } from "./useLidoList";
import { pickLidoFilters } from "./utils";

export function useLidoWithdrawalQueueFinalizationsData() {
  const {
    cursor,
    txHash = "",
    time_dimension: timeDimension = "block",
    block_start: blockStart,
    block_end: blockEnd,
    date_start: dateStart,
    date_end: dateEnd,
    [TABLE_SORT_QUERY_KEY]: sortQuery,
  } = useQueryParams({ parseNumbers: false });

  return useLidoList({
    query: GET_LIDO_WITHDRAWAL_QUEUE_FINALIZATIONS,
    field: "withdrawalFinalizations",
    sortQuery,
    cursor,
    where: pickLidoFilters({ txHash }),
    timeDimensionParams: {
      timeDimension,
      blockStart,
      blockEnd,
      dateStart,
      dateEnd,
    },
  });
}
