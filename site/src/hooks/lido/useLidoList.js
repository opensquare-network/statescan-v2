import { EMPTY_OBJECT } from "../../utils/constants";
import { useLidoServerListVariables } from "./useLidoListVariables";
import { useLidoServerQuery } from "./useLidoQuery";

export function useLidoServerListQuery({
  query,
  field,
  variables = EMPTY_OBJECT,
  pageSize,
  skip,
}) {
  const listVariables = useLidoServerListVariables({ pageSize, variables });
  const queryResult = useLidoServerQuery(query, {
    variables: listVariables,
    skip,
  });
  const queryData = queryResult.data || queryResult.previousData;
  const data = queryData?.[field];

  return {
    ...queryResult,
    data,
  };
}
