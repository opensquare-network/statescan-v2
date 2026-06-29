import {
  GET_LIDO_STETH_HOLDERS,
  GET_LIDO_WSTETH_HOLDERS,
} from "../../services/gql/lido";
import { useLidoServerQuery } from "./useLidoQuery";
import { useLidoServerListVariables } from "./useLidoListVariables";

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
  const variables = useLidoServerListVariables();
  const queryResult = useLidoServerQuery(GET_LIDO_WSTETH_HOLDERS, {
    variables,
  });

  return {
    ...queryResult,
    data: queryResult.data?.wstethHolders,
  };
}
