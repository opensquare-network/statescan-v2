import { useMemo } from "react";
import { GET_LIDO_STAKING_MODULE_TIMELINES } from "../../services/gql/lido";
import { useLidoQuery } from "./useLidoQuery";

export function useLidoStakingModuleTimelineData(stakingModuleId) {
  const variables = useMemo(
    () => ({
      first: 1000,
      where: {
        stakingModuleId: String(stakingModuleId),
      },
      orderBy: "blockNumber",
      orderDirection: "desc",
    }),
    [stakingModuleId],
  );

  const queryResult = useLidoQuery(GET_LIDO_STAKING_MODULE_TIMELINES, {
    variables,
    skip: !stakingModuleId,
  });

  return {
    ...queryResult,
    data: queryResult.data?.stakingModuleTimelines || [],
  };
}
