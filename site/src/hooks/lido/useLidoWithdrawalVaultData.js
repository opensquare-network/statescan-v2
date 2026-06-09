import last from "lodash.last";
import { GET_LIDO_WITHDRAWAL_VAULT_WITHDRAWALS_RECEIVED } from "../../services/gql/lido";
import { useLidoQuery } from "./useLidoQuery";
import { useLidoListVariables } from "./useLidoListVariables";
import { useLidoListQueryParams } from "./useLidoListQueryParams";
import { encodeCursor } from "./utils";

const DEFAULT_SORT = "blockNumber_desc";

export function useLidoWithdrawalVaultData() {
  const { cursor, txHash, timeDimensionParams } = useLidoListQueryParams();
  const { variables, pageSize } = useLidoListVariables({
    sortQuery: DEFAULT_SORT,
    cursor,
    where: {
      ...(txHash ? { txHash } : {}),
    },
    timeDimensionParams,
  });

  const queryResult = useLidoQuery(
    GET_LIDO_WITHDRAWAL_VAULT_WITHDRAWALS_RECEIVED,
    { variables },
  );

  const queryData = queryResult.data || queryResult.previousData;
  const items = queryData?.withdrawalVaultWithdrawalsReceiveds || [];
  const hasNextPage = items.length === pageSize;
  const nextCursor = hasNextPage
    ? encodeCursor(last(items), variables.orderBy)
    : null;

  return {
    ...queryResult,
    data: {
      items,
      nextCursor,
    },
  };
}
