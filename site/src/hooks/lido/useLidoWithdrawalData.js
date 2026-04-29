import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { GET_LIDO_WITHDRAWAL_REQUESTS } from "../../services/gql/lido";
import { useLidoQuery } from "./useLidoQuery";

export function useLidoWithdrawalData() {
  const { requestId = "" } = useParams();
  const variables = useMemo(
    () => ({
      includeStats: false,
      first: 1,
      skip: 0,
      where: {
        id: String(requestId),
      },
      orderBy: "blockNumber",
      orderDirection: "desc",
    }),
    [requestId],
  );

  const queryResult = useLidoQuery(GET_LIDO_WITHDRAWAL_REQUESTS, {
    variables,
    skip: !requestId,
  });

  return {
    ...queryResult,
    data: queryResult.data?.withdrawalRequests?.[0] || null,
    requestId,
  };
}
