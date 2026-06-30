import {
  GET_LIDO_STETH_HOLDERS,
  GET_LIDO_WSTETH_HOLDERS,
} from "../../services/gql/lido";
import { useLidoServerListQuery } from "./useLidoList";

export function useLidoStETHHoldersData() {
  return useLidoServerListQuery({
    query: GET_LIDO_STETH_HOLDERS,
    field: "stethHolders",
  });
}

export function useLidoWstETHHoldersData() {
  return useLidoServerListQuery({
    query: GET_LIDO_WSTETH_HOLDERS,
    field: "wstethHolders",
  });
}
