import { GET_LIDO_TREASURY_TOKENS_STATUS } from "../../services/gql/lido";
import { useLidoServerQuery } from "./useLidoQuery";

export function useLidoTreasuryTokenBalancesData() {
  const queryResult = useLidoServerQuery(GET_LIDO_TREASURY_TOKENS_STATUS);
  const queryData = queryResult.data || queryResult.previousData;
  const treasuryTokens = queryData?.status?.value || {};

  return {
    ...queryResult,
    data: treasuryTokens,
  };
}
