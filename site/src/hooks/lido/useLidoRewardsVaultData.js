import { GET_LIDO_REWARDS_VAULT_ETH_RECEIVED } from "../../services/gql/lido";
import { useLidoServerQuery } from "./useLidoQuery";
import { useLidoListQueryParams } from "./useLidoListQueryParams";
import {
  getLidoServerIndexerFilter,
  useLidoServerListVariables,
} from "./useLidoListVariables";
import { pickLidoFilters } from "./utils";

export function useLidoRewardsVaultData() {
  const { txHash, timeDimensionParams } = useLidoListQueryParams();
  const variables = useLidoServerListVariables({
    variables: pickLidoFilters({
      filter: getLidoServerIndexerFilter({ txHash, timeDimensionParams }),
    }),
  });
  const queryResult = useLidoServerQuery(GET_LIDO_REWARDS_VAULT_ETH_RECEIVED, {
    variables,
  });

  const queryData = queryResult.data || queryResult.previousData;

  return {
    ...queryResult,
    data: queryData?.rewardsVaultReceived,
  };
}
