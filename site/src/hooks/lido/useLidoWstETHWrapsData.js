import {
  GET_LIDO_WSTETH_UNWRAPS,
  GET_LIDO_WSTETH_WRAPS,
} from "../../services/gql/lido";
import { EMPTY_OBJECT } from "../../utils/constants";
import { useLidoServerListQuery } from "./useLidoList";
import { useLidoServerFilterVariables } from "./useLidoListVariables";

function useLidoWstETHWrapEventsData({ query, field, filters = EMPTY_OBJECT }) {
  const variables = useLidoServerFilterVariables({
    address: filters.address,
    withSort: true,
    defaultSortQuery: "block_desc",
  });

  return useLidoServerListQuery({ query, field, variables });
}

export function useLidoWstETHWrapsData(options = EMPTY_OBJECT) {
  return useLidoWstETHWrapEventsData({
    query: GET_LIDO_WSTETH_WRAPS,
    field: "wrap",
    filters: options.filters,
  });
}

export function useLidoWstETHUnwrapsData(options = EMPTY_OBJECT) {
  return useLidoWstETHWrapEventsData({
    query: GET_LIDO_WSTETH_UNWRAPS,
    field: "unwrap",
    filters: options.filters,
  });
}
