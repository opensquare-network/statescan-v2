import { useParams } from "react-router-dom";
import { GET_LIDO_VAULT } from "../../services/gql/lido";
import { useLidoServerQuery } from "./useLidoQuery";

export function useLidoVaultData() {
  const { vaultId = "" } = useParams();

  const queryResult = useLidoServerQuery(GET_LIDO_VAULT, {
    variables: {
      vault: vaultId.toLowerCase(),
    },
    skip: !vaultId,
  });

  return {
    ...queryResult,
    data: queryResult.data?.vaultHubVault || null,
    vaultId,
  };
}
