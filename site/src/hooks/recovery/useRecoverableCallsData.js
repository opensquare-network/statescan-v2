import { useQuery } from "@apollo/client";
import { GET_RECOVERABLE_CALLS } from "../../services/gql/recovery";
import { LIST_DEFAULT_PAGE_SIZE } from "../../utils/constants";
import { useRecoverableParams } from "./useRecoverableParams";

export function useRecoverableCallsData() {
  const { address, height, page = 1 } = useRecoverableParams();
  const pageSize = LIST_DEFAULT_PAGE_SIZE;
  const { data, ...rest } = useQuery(GET_RECOVERABLE_CALLS, {
    variables: {
      recoverableHeight: height,
      lostAccount: address,
      offset: (page - 1) * pageSize,
      limit: pageSize,
    },
  });

  return {
    data: data?.recoverableCalls,
    ...rest,
  };
}
