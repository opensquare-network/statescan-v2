import { useParams } from "react-router-dom";
import { GET_LIDO_SERVER_NODE_OPERATOR } from "../../services/gql/lido";
import { useLidoServerQuery } from "./useLidoQuery";

export function useLidoNodeOperatorData() {
  const { stakingModuleId = "", nodeOperatorId = "" } = useParams();

  const queryResult = useLidoServerQuery(GET_LIDO_SERVER_NODE_OPERATOR, {
    variables: {
      stakingModuleId: Number(stakingModuleId),
      nodeOperatorId: Number(nodeOperatorId),
    },
    skip: !stakingModuleId || !nodeOperatorId,
  });

  return {
    ...queryResult,
    data: queryResult.data?.nodeOperator || null,
    stakingModuleId,
    nodeOperatorId,
  };
}
