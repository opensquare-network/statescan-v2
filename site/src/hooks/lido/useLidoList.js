import { EMPTY_OBJECT } from "../../utils/constants";
import {
  useLidoListVariables,
  useLidoServerListVariables,
} from "./useLidoListVariables";
import { useLidoQuery, useLidoServerQuery } from "./useLidoQuery";
import { toLidoListQueryResult } from "./utils";

export function useLidoList({ query, field, ...listOptions }) {
  const { variables, pageSize } = useLidoListVariables(listOptions);
  const queryResult = useLidoQuery(query, { variables });

  return toLidoListQueryResult(queryResult, field, pageSize, variables.orderBy);
}

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
