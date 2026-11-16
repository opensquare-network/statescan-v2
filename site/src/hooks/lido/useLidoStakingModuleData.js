import { useParams } from "react-router-dom";
import { GET_LIDO_SERVER_STAKING_MODULE } from "../../services/gql/lido";
import { useLidoServerQuery } from "./useLidoQuery";

export function useLidoStakingModuleData() {
  const { stakingModuleId = "" } = useParams();

  const queryResult = useLidoServerQuery(GET_LIDO_SERVER_STAKING_MODULE, {
    variables: {
      stakingModuleId: Number(stakingModuleId),
    },
    skip: !stakingModuleId,
  });

  return {
    ...queryResult,
    data: queryResult.data?.stakingModule || null,
    stakingModuleId,
  };
}
