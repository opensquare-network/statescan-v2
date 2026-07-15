import {
  GET_LIDO_STETH_HOLDERS,
  GET_LIDO_WSTETH_HOLDERS,
} from "../../services/gql/lido";
import { useLidoServerListQuery } from "./useLidoList";
import { useLidoListQueryParams } from "./useLidoListQueryParams";
import { toLidoSort } from "./useLidoListVariables";

export function useLidoStETHHoldersData() {
  const { sortQuery } = useLidoListQueryParams();

  return useLidoServerListQuery({
    query: GET_LIDO_STETH_HOLDERS,
    field: "stethHolders",
    variables: {
      sort: toLidoSort(sortQuery || "shares_desc"),
    },
  });
}

export function useLidoWstETHHoldersData() {
  const { sortQuery } = useLidoListQueryParams();

  return useLidoServerListQuery({
    query: GET_LIDO_WSTETH_HOLDERS,
    field: "wstethHolders",
    variables: {
      sort: toLidoSort(sortQuery || "balance_desc"),
    },
  });
}
