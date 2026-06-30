import { GET_LIDO_REWARDS_VAULT_ETH_RECEIVED } from "../../services/gql/lido";
import { useLidoServerListQuery } from "./useLidoList";
import { useLidoServerIndexerFilterVariables } from "./useLidoListVariables";

export function useLidoRewardsVaultData() {
  const variables = useLidoServerIndexerFilterVariables();

  return useLidoServerListQuery({
    query: GET_LIDO_REWARDS_VAULT_ETH_RECEIVED,
    field: "rewardsVaultReceived",
    variables,
  });
}
