import { GET_LIDO_STATUS } from "../../services/gql/lido";
import { useLidoServerQuery } from "./useLidoQuery";

export function useLidoStatusData(key, fallback) {
  const queryResult = useLidoServerQuery(GET_LIDO_STATUS, {
    variables: { key },
  });
  const queryData = queryResult.data || queryResult.previousData;

  return {
    ...queryResult,
    data: queryData?.status?.value ?? fallback,
  };
}
