import {
  GET_LIDO_WSTETH_UNWRAPS,
  GET_LIDO_WSTETH_WRAPS,
} from "../../services/gql/lido";
import { useLidoServerListQuery } from "./useLidoList";
import { useLidoServerIndexerFilterVariables } from "./useLidoListVariables";

function useLidoWstETHWrapEventsData({ query, field }) {
  const variables = useLidoServerIndexerFilterVariables();

  return useLidoServerListQuery({ query, field, variables });
}

export function useLidoWstETHWrapsData() {
  return useLidoWstETHWrapEventsData({
    query: GET_LIDO_WSTETH_WRAPS,
    field: "wrap",
  });
}

export function useLidoWstETHUnwrapsData() {
  return useLidoWstETHWrapEventsData({
    query: GET_LIDO_WSTETH_UNWRAPS,
    field: "unwrap",
  });
}
