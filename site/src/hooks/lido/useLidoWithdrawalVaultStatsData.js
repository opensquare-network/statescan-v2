import { GET_LIDO_WITHDRAWAL_VAULT_PROTOCOL_STAT } from "../../services/gql/lido";
import { useLidoQuery } from "./useLidoQuery";

const emptyData = {
  count: 0,
  value: 0,
};

export function useLidoWithdrawalVaultStatsData() {
  const queryResult = useLidoQuery(GET_LIDO_WITHDRAWAL_VAULT_PROTOCOL_STAT);
  const queryData = queryResult.data || queryResult.previousData;
  const stat = queryData?.protocolStat;

  return {
    ...queryResult,
    data: stat ?? emptyData,
  };
}
