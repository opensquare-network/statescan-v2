import last from "lodash.last";
import { TABLE_SORT_QUERY_KEY } from "../../utils/constants";
import { GET_LIDO_WITHDRAWAL_REQUESTS } from "../../services/gql/lido";
import { useQueryParams } from "../useQueryParams";
import { useLidoQuery } from "./useLidoQuery";
import { useLidoListVariables } from "./useLidoListVariables";
import { encodeCursor } from "./utils";

export function useLidoWithdrawalsData() {
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
  } = useQueryParams({ parseNumbers: false });
  const status = statusQuery === "null" ? "" : statusQuery;
  const { variables, pageSize } = useLidoListVariables({
    sortQuery,
    cursor,
    where: {
      ...(status ? { status } : {}),
      ...(txHash ? { txHash } : {}),
    },
    timeDimensionParams: {
      timeDimension,
      blockStart,
      blockEnd,
      dateStart,
      dateEnd,
    },
  });

  const queryResult = useLidoQuery(GET_LIDO_WITHDRAWAL_REQUESTS, { variables });

  const queryData = queryResult.data || queryResult.previousData;
  const items = queryData?.withdrawalRequests || [];
  const hasNextPage = items.length === pageSize;
  const nextCursor = hasNextPage
    ? encodeCursor(last(items), variables.orderBy)
    : null;

  return {
    ...queryResult,
    data: {
      items,
      nextCursor,
    },
  };
}
