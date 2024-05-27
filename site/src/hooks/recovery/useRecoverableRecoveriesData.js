import { useQuery } from "@apollo/client";
import { GET_RECOVERABLE_RECOVERIES } from "../../services/gql/recovery";
import { LIST_DEFAULT_PAGE_SIZE } from "../../utils/constants";
import { useRecoverableParams } from "../../utils/hooks/recovery/useRecoverableParams";

export function useRecoverableRecoveriesData() {
  const { address, height, page = 1 } = useRecoverableParams();
  const { data, ...rest } = useQuery(GET_RECOVERABLE_RECOVERIES, {
    variables: {
      limit: LIST_DEFAULT_PAGE_SIZE,
      offset: page,
      lostAccount: address,
      recoverableHeight: height,
    },
  });

  return {
    data: data?.recoverableRecoveries,
    ...rest,
  };
}
