import last from "lodash.last";
import { TABLE_SORT_QUERY_KEY } from "../../utils/constants";
import { GET_LIDO_DEPOSITS } from "../../services/gql/lido";
import { useQueryParams } from "../useQueryParams";
import { useLidoQuery } from "./useLidoQuery";
import { useLidoListVariables } from "./useLidoListVariables";

export function useLidoDepositsData() {
  const {
    cursor,
    address,
    txHash,
    time_dimension: timeDimension = "block",
    block_start: blockStart,
    block_end: blockEnd,
    date_start: dateStart,
    date_end: dateEnd,
    [TABLE_SORT_QUERY_KEY]: sortQuery,
  } = useQueryParams({ parseNumbers: false });
  const { variables, pageSize } = useLidoListVariables({
    sortQuery,
    cursor,
    where: {
      ...(address ? { address_contains_nocase: String(address) } : {}),
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

  const queryResult = useLidoQuery(GET_LIDO_DEPOSITS, { variables });

  const queryData = queryResult.data || queryResult.previousData;
  const items = queryData?.deposits || [];
  const hasNextPage = items.length === pageSize;
  const nextCursor = hasNextPage ? last(items)?.id : null;

  return {
    ...queryResult,
    data: {
      items,
      nextCursor,
    },
  };
}
