import {
  GET_LIDO_PROTOCOL_STAT,
  GET_LIDO_STETH_TOTALS,
} from "../../services/gql/lido";
import { useLidoQuery, useLidoServerQuery } from "./useLidoQuery";

export function useLidoProtocolStatData(id) {
  const queryResult = useLidoQuery(GET_LIDO_PROTOCOL_STAT, {
    variables: { id },
    skip: !id,
  });

  const queryData = queryResult.data;
  const stat = queryData?.protocolStat;

  return {
    ...queryResult,
    data: stat,
  };
}

export function useLidoStEthHolderCountData() {
  const queryResult = useLidoServerQuery(GET_LIDO_STETH_TOTALS);
  const total = queryResult.data?.stethHolders?.total;

  return {
    ...queryResult,
    data: {
      count: total,
      value: total,
    },
  };
}
