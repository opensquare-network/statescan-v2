import { EMPTY_OBJECT, TABLE_SORT_QUERY_KEY } from "../../utils/constants";
import {
  GET_LIDO_WSTETH_UNWRAPS,
  GET_LIDO_WSTETH_WRAPS,
} from "../../services/gql/lido";
import { useQueryParams } from "../useQueryParams";
import { useLidoList } from "./useLidoList";
import { pickLidoFilters } from "./utils";

function useLidoWstETHWrapEventsData({ query, field }) {
  const queryParams = useQueryParams({ parseNumbers: false });
  const params = queryParams || EMPTY_OBJECT;
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
  } = params;

  return useLidoList({
    query,
    field,
    sortQuery,
    cursor,
    where: pickLidoFilters({
      address_contains_nocase: address,
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

export function useLidoWstETHWrapsData() {
  return useLidoWstETHWrapEventsData({
    query: GET_LIDO_WSTETH_WRAPS,
    field: "wstETHWraps",
  });
}

export function useLidoWstETHUnwrapsData() {
  return useLidoWstETHWrapEventsData({
    query: GET_LIDO_WSTETH_UNWRAPS,
    field: "wstETHUnwraps",
  });
}
