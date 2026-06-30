import { GET_LIDO_SERVER_STAKING_ROUTER_ETH_DEPOSITED } from "../../services/gql/lido";
import { useLidoServerQuery } from "./useLidoQuery";
import {
  getLidoServerIndexerFilter,
  useLidoServerListVariables,
} from "./useLidoListVariables";
import { useLidoListQueryParams } from "./useLidoListQueryParams";
import { pickLidoFilters } from "./utils";

function toStakingRouterEthDepositedItem(item) {
  const rowKey = [item.indexer?.txHash, item.indexer?.logIndex]
    .filter(Boolean)
    .join("-");

  return {
    ...item,
    blockNumber: item.indexer?.blockNumber,
    blockTime: item.indexer?.blockTimestamp,
    id: rowKey,
    logIndex: item.indexer?.logIndex,
    txHash: item.indexer?.txHash,
  };
}

function toServerStakingRouterEthDepositedResult(queryResult) {
  const queryData = queryResult.data || queryResult.previousData;
  const data = queryData?.stakingRouterEthDeposited;

  return {
    ...queryResult,
    data: data && {
      ...data,
      items: (data.items || []).map(toStakingRouterEthDepositedItem),
    },
  };
}

export function useLidoStakingRouterETHDepositedsData(fixedStakingModuleId) {
  const {
    txHash,
    params: { stakingModuleId = "" },
    timeDimensionParams,
  } = useLidoListQueryParams();
  const moduleId = fixedStakingModuleId || stakingModuleId;
  const serverVariables = useLidoServerListVariables({
    variables: pickLidoFilters({
      stakingModuleId: moduleId ? Number(moduleId) : undefined,
      filter: getLidoServerIndexerFilter({ txHash, timeDimensionParams }),
    }),
  });

  const serverQueryResult = useLidoServerQuery(
    GET_LIDO_SERVER_STAKING_ROUTER_ETH_DEPOSITED,
    {
      variables: serverVariables,
    },
  );

  return toServerStakingRouterEthDepositedResult(serverQueryResult);
}
