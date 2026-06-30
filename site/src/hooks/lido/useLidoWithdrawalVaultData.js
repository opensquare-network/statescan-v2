import { GET_LIDO_WITHDRAWAL_VAULT_WITHDRAWALS_RECEIVED } from "../../services/gql/lido";
import { useLidoServerListQuery } from "./useLidoList";
import { useLidoServerIndexerFilterVariables } from "./useLidoListVariables";

export function useLidoWithdrawalVaultData() {
  const variables = useLidoServerIndexerFilterVariables();

  return useLidoServerListQuery({
    query: GET_LIDO_WITHDRAWAL_VAULT_WITHDRAWALS_RECEIVED,
    field: "withdrawalVaultReceived",
    variables,
  });
}
