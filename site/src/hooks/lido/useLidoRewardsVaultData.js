import last from "lodash.last";
import { GET_LIDO_REWARDS_VAULT_ETH_RECEIVED } from "../../services/gql/lido";
import { useQueryParams } from "../useQueryParams";
import { useLidoQuery } from "./useLidoQuery";
import { useLidoListVariables } from "./useLidoListVariables";
import { encodeCursor } from "./utils";

const DEFAULT_SORT = "blockNumber_desc";

export function useLidoRewardsVaultData() {
  const {
    cursor,
    txHash = "",
    time_dimension: timeDimension = "block",
    block_start: blockStart,
    block_end: blockEnd,
    date_start: dateStart,
    date_end: dateEnd,
  } = useQueryParams({ parseNumbers: false });
  const { variables, pageSize } = useLidoListVariables({
    sortQuery: DEFAULT_SORT,
    cursor,
    where: {
      ...(txHash ? { txHash } : {}),
    },
    timeDimensionParams: {
      timeDimension,
      blockStart,
      blockEnd,
      dateStart,
      dateEnd,
    },
  });

  const queryResult = useLidoQuery(GET_LIDO_REWARDS_VAULT_ETH_RECEIVED, {
    variables,
  });

  const queryData = queryResult.data || queryResult.previousData;
  const items = queryData?.rewardsVaultETHReceiveds || [];
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
