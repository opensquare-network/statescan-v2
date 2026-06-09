import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { GET_LIDO_NODE_OPERATOR } from "../../services/gql/lido";
import { useLidoStakingRouterQuery } from "./useLidoQuery";

export function useLidoNodeOperatorData() {
  const { stakingModuleId = "", nodeOperatorId = "" } = useParams();
  const variables = useMemo(
    () => ({
      first: 1,
      where: {
        stakingModuleId: String(stakingModuleId),
        nodeOperatorId: String(nodeOperatorId),
      },
      orderBy: "nodeOperatorId",
      orderDirection: "asc",
    }),
    [stakingModuleId, nodeOperatorId],
  );

  const queryResult = useLidoStakingRouterQuery(GET_LIDO_NODE_OPERATOR, {
    variables,
    skip: !stakingModuleId || !nodeOperatorId,
  });

  return {
    ...queryResult,
    data: queryResult.data?.nodeOperators?.[0] || null,
    stakingModuleId,
    nodeOperatorId,
  };
}
