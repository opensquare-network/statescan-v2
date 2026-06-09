import { EMPTY_OBJECT } from "../../utils/constants";
import {
  GET_LIDO_WSTETH_UNWRAPS,
  GET_LIDO_WSTETH_WRAPS,
} from "../../services/gql/lido";
import { useLidoList } from "./useLidoList";
import { useLidoListQueryParams } from "./useLidoListQueryParams";
import { pickLidoFilters } from "./utils";

function useLidoWstETHWrapEventsData({ query, field, filters = EMPTY_OBJECT }) {
  const {
    cursor,
    txHash,
    sortQuery,
    params: { address },
    timeDimensionParams,
  } = useLidoListQueryParams();

  return useLidoList({
    query,
    field,
    sortQuery,
    cursor,
    where: pickLidoFilters({
      address: String(filters.address ?? address ?? ""),
      txHash,
    }),
    timeDimensionParams,
  });
}

export function useLidoWstETHWrapsData(options = EMPTY_OBJECT) {
  return useLidoWstETHWrapEventsData({
    query: GET_LIDO_WSTETH_WRAPS,
    field: "wstETHWraps",
    filters: options.filters,
  });
}

export function useLidoWstETHUnwrapsData(options = EMPTY_OBJECT) {
  return useLidoWstETHWrapEventsData({
    query: GET_LIDO_WSTETH_UNWRAPS,
    field: "wstETHUnwraps",
    filters: options.filters,
  });
}
