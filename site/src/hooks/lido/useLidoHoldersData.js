import { EMPTY_OBJECT, TABLE_SORT_QUERY_KEY } from "../../utils/constants";
import {
  GET_LIDO_STETH_HOLDERS,
  GET_LIDO_WSTETH_HOLDERS,
} from "../../services/gql/lido";
import { useQueryParams } from "../useQueryParams";
import { useLidoList } from "./useLidoList";
import { useLidoServerQuery } from "./useLidoQuery";
import { pickLidoFilters } from "./utils";
import { useLidoServerListVariables } from "./useLidoListVariables";

function useLidoHoldersData({ query, field, defaultSortQuery, nonZeroField }) {
  const queryParams = useQueryParams({ parseNumbers: false });
  const params = queryParams || EMPTY_OBJECT;
  const { cursor, address, [TABLE_SORT_QUERY_KEY]: sortQuery } = params;

  return useLidoList({
    query,
    field,
    sortQuery: sortQuery || defaultSortQuery,
    cursor,
    where: pickLidoFilters({
      id: String(address ?? ""),
      [`${nonZeroField}_not`]: "0",
    }),
  });
}

export function useLidoStETHHoldersData() {
  const variables = useLidoServerListVariables();
  const queryResult = useLidoServerQuery(GET_LIDO_STETH_HOLDERS, {
    variables,
  });

  return {
    ...queryResult,
    data: queryResult.data?.stethHolders,
  };
}

export function useLidoWstETHHoldersData() {
  return useLidoHoldersData({
    query: GET_LIDO_WSTETH_HOLDERS,
    field: "wstETHHolders",
    defaultSortQuery: "balance_desc",
    nonZeroField: "balance",
  });
}
