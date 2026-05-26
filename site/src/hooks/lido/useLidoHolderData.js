import {
  GET_LIDO_STETH_HOLDER,
  GET_LIDO_WSTETH_HOLDER,
} from "../../services/gql/lido";
import { useLidoQuery } from "./useLidoQuery";

function useLidoHolderData({ address, query, field }) {
  const result = useLidoQuery(query, {
    variables: {
      where: { id: address },
    },
    skip: !address,
  });

  return {
    ...result,
    data: result.data?.[field]?.[0] || null,
  };
}

export function useLidoStETHHolderData(address) {
  return useLidoHolderData({
    address,
    query: GET_LIDO_STETH_HOLDER,
    field: "stETHHolders",
  });
}

export function useLidoWstETHHolderData(address) {
  return useLidoHolderData({
    address,
    query: GET_LIDO_WSTETH_HOLDER,
    field: "wstETHHolders",
  });
}
