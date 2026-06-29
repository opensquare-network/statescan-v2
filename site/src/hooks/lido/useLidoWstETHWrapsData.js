import {
  GET_LIDO_WSTETH_UNWRAPS,
  GET_LIDO_WSTETH_WRAPS,
} from "../../services/gql/lido";
import { useLidoListQueryParams } from "./useLidoListQueryParams";
import { useLidoServerQuery } from "./useLidoQuery";
import {
  getLidoServerIndexerFilter,
  useLidoServerListVariables,
} from "./useLidoListVariables";

function useLidoWstETHWrapEventsData({ query, field }) {
  const { txHash, timeDimensionParams } = useLidoListQueryParams();
  const variables = useLidoServerListVariables({
    variables: {
      filter: getLidoServerIndexerFilter({ txHash, timeDimensionParams }),
    },
  });
  const queryResult = useLidoServerQuery(query, {
    variables,
  });

  return {
    ...queryResult,
    data: queryResult.data?.[field],
  };
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
