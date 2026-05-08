import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { GET_LIDO_VAULT } from "../../services/gql/lido";
import { useLidoQuery } from "./useLidoQuery";

export function useLidoVaultData() {
  const { vaultId = "" } = useParams();
  const variables = useMemo(
    () => ({
      first: 1,
      where: {
        id: String(vaultId),
      },
      orderBy: "updatedAtBlock",
      orderDirection: "desc",
    }),
    [vaultId],
  );

  const queryResult = useLidoQuery(GET_LIDO_VAULT, {
    variables,
    skip: !vaultId,
  });

  return {
    ...queryResult,
    data: queryResult.data?.vaults?.[0] || null,
    vaultId,
  };
}
