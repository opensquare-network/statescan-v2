import { GET_LIDO_VAULTS } from "../../services/gql/lido";
import { useLidoServerQuery } from "./useLidoQuery";
import { useLidoServerListVariables } from "./useLidoListVariables";

export function useLidoVaultsData() {
  const variables = useLidoServerListVariables();

  const queryResult = useLidoServerQuery(GET_LIDO_VAULTS, { variables });

  return {
    ...queryResult,
    data: queryResult.data?.vaultHubVaults,
  };
}
