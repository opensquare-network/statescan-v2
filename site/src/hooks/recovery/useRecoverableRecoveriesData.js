import { useQuery } from "@apollo/client";
import { GET_RECOVERABLE_RECOVERIES } from "../../services/gql/recovery";
import { LIST_DEFAULT_PAGE_SIZE } from "../../utils/constants";
import { useRecoverableParams } from "./useRecoverableParams";

export function useRecoverableRecoveriesData() {
  const { address, height, page = 1 } = useRecoverableParams();
  const pageSize = LIST_DEFAULT_PAGE_SIZE;
  const { data, ...rest } = useQuery(GET_RECOVERABLE_RECOVERIES, {
    variables: {
      limit: pageSize,
      offset: (page - 1) * pageSize,
      lostAccount: address,
      recoverableHeight: height,
    },
  });

  return {
    data: data?.recoverableRecoveries,
    ...rest,
  };
}
