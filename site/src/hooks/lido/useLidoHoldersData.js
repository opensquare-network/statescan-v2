import { EMPTY_OBJECT, TABLE_SORT_QUERY_KEY } from "../../utils/constants";
import {
  GET_LIDO_STETH_HOLDERS,
  GET_LIDO_WSTETH_HOLDERS,
} from "../../services/gql/lido";
import { useQueryParams } from "../useQueryParams";
import { useLidoList } from "./useLidoList";
import { pickLidoFilters } from "./utils";

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
  return useLidoHoldersData({
    query: GET_LIDO_STETH_HOLDERS,
    field: "stETHHolders",
    defaultSortQuery: "shares_desc",
    nonZeroField: "shares",
  });
}

export function useLidoWstETHHoldersData() {
  return useLidoHoldersData({
    query: GET_LIDO_WSTETH_HOLDERS,
    field: "wstETHHolders",
    defaultSortQuery: "balance_desc",
    nonZeroField: "balance",
  });
}
