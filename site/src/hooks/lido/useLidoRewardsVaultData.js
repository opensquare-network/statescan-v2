import { GET_LIDO_REWARDS_VAULT_ETH_RECEIVED } from "../../services/gql/lido";
import { useLidoServerListQuery } from "./useLidoList";
import { useLidoServerFilterVariables } from "./useLidoListVariables";

export function useLidoRewardsVaultData() {
  const variables = useLidoServerFilterVariables();

  return useLidoServerListQuery({
    query: GET_LIDO_REWARDS_VAULT_ETH_RECEIVED,
    field: "rewardsVaultReceived",
    variables,
  });
}
