import { GET_LIDO_WITHDRAWAL_VAULT_WITHDRAWALS_RECEIVED } from "../../services/gql/lido";
import { useLidoServerListQuery } from "./useLidoList";
import { useLidoServerFilterVariables } from "./useLidoListVariables";

export function useLidoWithdrawalVaultData() {
  const variables = useLidoServerFilterVariables({
    withSort: true,
    defaultSortQuery: "block_desc",
  });

  return useLidoServerListQuery({
    query: GET_LIDO_WITHDRAWAL_VAULT_WITHDRAWALS_RECEIVED,
    field: "withdrawalVaultReceived",
    variables,
  });
}
