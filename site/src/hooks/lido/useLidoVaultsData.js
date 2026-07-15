import { GET_LIDO_VAULTS } from "../../services/gql/lido";
import { useLidoServerListQuery } from "./useLidoList";

export function useLidoVaultsData() {
  return useLidoServerListQuery({
    query: GET_LIDO_VAULTS,
    field: "vaultHubVaults",
  });
}
