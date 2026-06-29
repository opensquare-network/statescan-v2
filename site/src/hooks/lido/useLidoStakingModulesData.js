import { GET_LIDO_SERVER_STAKING_MODULES } from "../../services/gql/lido";
import { useLidoServerQuery } from "./useLidoQuery";
import { useLidoServerListVariables } from "./useLidoListVariables";

export function useLidoStakingModulesData() {
  const variables = useLidoServerListVariables();

  const queryResult = useLidoServerQuery(GET_LIDO_SERVER_STAKING_MODULES, {
    variables,
  });

  return {
    ...queryResult,
    data: queryResult.data?.stakingModules,
  };
}
