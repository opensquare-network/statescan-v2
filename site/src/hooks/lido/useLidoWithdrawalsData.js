import { useMemo } from "react";
import last from "lodash.last";
import {
  LIST_DEFAULT_PAGE_SIZE,
  TABLE_SORT_QUERY_KEY,
} from "../../utils/constants";
import { GET_LIDO_WITHDRAWAL_REQUESTS } from "../../services/gql/lido";
import { useQueryParams } from "../useQueryParams";
import { useLidoQuery } from "./useLidoQuery";

const DEFAULT_ORDER_BY = "blockNumber";
const DEFAULT_ORDER_DIRECTION = "desc";

function getSort(sort) {
  if (!sort) {
    return {
      orderBy: DEFAULT_ORDER_BY,
      orderDirection: DEFAULT_ORDER_DIRECTION,
    };
  }

  const parts = String(sort).split("_");
  const orderDirection = parts.pop();

  return {
    orderBy: parts.join("_"),
    orderDirection,
  };
}

function getCursorFilter(cursor, orderDirection) {
  if (!cursor) {
    return {};
  }

  const id = String(cursor);

  return orderDirection === "desc" ? { id_lt: id } : { id_gt: id };
}

export function useLidoWithdrawalsData() {
  const {
    cursor,
    [TABLE_SORT_QUERY_KEY]: sortQuery,
    status: statusQuery = "",
    txHash = "",
  } = useQueryParams({ parseNumbers: false });
  const status = statusQuery === "null" ? "" : statusQuery;
  const pageSize = LIST_DEFAULT_PAGE_SIZE;

  const variables = useMemo(() => {
    const sort = getSort(sortQuery);
    const where = {
      ...(status ? { status } : {}),
      ...(txHash ? { txHash } : {}),
      ...getCursorFilter(cursor, sort.orderDirection),
    };

    return {
      first: pageSize,
      ...sort,
      ...(Object.keys(where).length ? { where } : {}),
    };
  }, [cursor, pageSize, sortQuery, status, txHash]);

  const queryResult = useLidoQuery(GET_LIDO_WITHDRAWAL_REQUESTS, { variables });

  const queryData = queryResult.data || queryResult.previousData;
  const items = queryData?.withdrawalRequests || [];
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
