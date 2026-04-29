import { useMemo } from "react";
import last from "lodash.last";
import {
  LIST_DEFAULT_PAGE_SIZE,
  TABLE_SORT_QUERY_KEY,
} from "../../utils/constants";
import { GET_LIDO_DEPOSITS } from "../../services/gql/lido";
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

export function useLidoDepositsData() {
  const {
    cursor,
    address,
    txHash,
    [TABLE_SORT_QUERY_KEY]: sortQuery,
  } = useQueryParams({ parseNumbers: false });
  const pageSize = LIST_DEFAULT_PAGE_SIZE;

  const variables = useMemo(() => {
    const sort = getSort(sortQuery);
    const where = {
      ...(address ? { address_contains_nocase: String(address) } : {}),
      ...(txHash ? { txHash } : {}),
      ...getCursorFilter(cursor, sort.orderDirection),
    };

    return {
      first: pageSize,
      ...sort,
      ...(Object.keys(where).length ? { where } : {}),
    };
  }, [address, cursor, pageSize, sortQuery, txHash]);

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
