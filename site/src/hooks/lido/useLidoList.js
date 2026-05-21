import { useLidoListVariables } from "./useLidoListVariables";
import { useLidoQuery } from "./useLidoQuery";
import { toLidoListQueryResult } from "./utils";

export function useLidoList({ query, field, ...listOptions }) {
  const { variables, pageSize } = useLidoListVariables(listOptions);
  const queryResult = useLidoQuery(query, { variables });

  return toLidoListQueryResult(queryResult, field, pageSize, variables.orderBy);
}
