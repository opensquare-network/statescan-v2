import { GET_LIDO_NODE_OPERATORS } from "../../services/gql/lido";
import { LIST_DEFAULT_PAGE_SIZE } from "../../utils/constants";
import { useLidoServerQuery } from "./useLidoQuery";

export function useLidoNodeOperatorsData(stakingModuleId) {
  const queryResult = useLidoServerQuery(GET_LIDO_NODE_OPERATORS, {
    variables: {
      stakingModuleId: Number(stakingModuleId),
      limit: LIST_DEFAULT_PAGE_SIZE,
      offset: 0,
    },
    skip: !stakingModuleId,
  });
  const data = queryResult.data?.nodeOperators;

  if (!data) {
    return queryResult;
  }

  return {
    ...queryResult,
    data: {
      ...data,
      offset: 0,
      limit: LIST_DEFAULT_PAGE_SIZE,
    },
  };
}
