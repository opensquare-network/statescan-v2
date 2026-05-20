import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { GET_LIDO_STAKING_MODULES } from "../../services/gql/lido";
import { useLidoStakingRouterQuery } from "./useLidoStakingRouterQuery";

export function useLidoStakingModuleData() {
  const { stakingModuleId = "" } = useParams();
  const variables = useMemo(
    () => ({
      first: 1,
      where: {
        id: String(stakingModuleId),
      },
      orderBy: "stakingModuleId",
      orderDirection: "asc",
    }),
    [stakingModuleId],
  );

  const queryResult = useLidoStakingRouterQuery(GET_LIDO_STAKING_MODULES, {
    variables,
    skip: !stakingModuleId,
  });

  return {
    ...queryResult,
    data: queryResult.data?.stakingModules?.[0] || null,
    stakingModuleId,
  };
}
