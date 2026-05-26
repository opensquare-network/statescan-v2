import { GET_LIDO_PROTOCOL_STAT } from "../../services/gql/lido";
import { useLidoQuery } from "./useLidoQuery";

const emptyData = {
  count: 0,
  value: 0,
};

export function useLidoProtocolStatData(id) {
  const queryResult = useLidoQuery(GET_LIDO_PROTOCOL_STAT, {
    variables: { id },
    skip: !id,
  });
  const queryData = queryResult.data;
  const stat = queryData?.protocolStat;

  return {
    ...queryResult,
    data: stat ?? emptyData,
  };
}
