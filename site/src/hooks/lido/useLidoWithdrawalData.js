import { useParams } from "react-router-dom";
import { GET_LIDO_WITHDRAWAL } from "../../services/gql/lido";
import { useLidoServerQuery } from "./useLidoQuery";

export function useLidoWithdrawalData() {
  const { requestId } = useParams();
  const queryResult = useLidoServerQuery(GET_LIDO_WITHDRAWAL, {
    variables: {
      requestId: requestId,
    },
    skip: !requestId,
  });

  return {
    ...queryResult,
    data: queryResult.data?.withdrawal,
    requestId,
  };
}
