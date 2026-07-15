import { GET_LIDO_NODE_OPERATORS } from "../../services/gql/lido";
import { LIST_DEFAULT_PAGE_SIZE } from "../../utils/constants";
import { toLidoSort, useLidoServerListVariables } from "./useLidoListVariables";
import { useLidoListQueryParams } from "./useLidoListQueryParams";
import { useLidoServerQuery } from "./useLidoQuery";

export function useLidoNodeOperatorsData(stakingModuleId) {
  const { sortQuery } = useLidoListQueryParams();
  const variables = useLidoServerListVariables({
    variables: {
      stakingModuleId: Number(stakingModuleId),
      sort: toLidoSort(sortQuery),
    },
  });
  const queryResult = useLidoServerQuery(GET_LIDO_NODE_OPERATORS, {
    variables,
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
      offset: variables.offset,
      limit: LIST_DEFAULT_PAGE_SIZE,
    },
  };
}
