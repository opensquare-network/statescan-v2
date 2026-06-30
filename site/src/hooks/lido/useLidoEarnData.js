import { useParams } from "react-router-dom";
import {
  GET_LIDO_EARN_VAULT_DEPOSIT,
  GET_LIDO_EARN_VAULT_REDEEM,
  GET_LIDO_EARN_VAULT_DEPOSITS,
  GET_LIDO_EARN_VAULT_QUEUES,
  GET_LIDO_EARN_VAULT_REDEEMS,
  GET_LIDO_EARN_SUBVAULTS,
} from "../../services/gql/lido";
import { useLidoServerQuery, useLidoStakingRouterQuery } from "./useLidoQuery";
import { useLidoServerListVariables } from "./useLidoListVariables";

const EARN_LIST_PAGE_SIZE = 25;
const markets = {
  eth: "ETH",
  usd: "USD",
};

function toEarnListResult(queryResult, field, skip) {
  if (skip) {
    return {
      ...queryResult,
      data: {
        items: [],
        total: 0,
        offset: 0,
        limit: EARN_LIST_PAGE_SIZE,
      },
    };
  }

  const queryData = queryResult.data || queryResult.previousData;

  return {
    ...queryResult,
    data: queryData?.[field],
  };
}

function useLidoEarnList({ query, field, type }) {
  const market = markets[type];
  const variables = useLidoServerListVariables({
    pageSize: EARN_LIST_PAGE_SIZE,
    variables: {
      market,
    },
  });
  const shouldSkip = !market;
  const queryResult = useLidoServerQuery(query, {
    variables,
    skip: shouldSkip,
  });

  return toEarnListResult(queryResult, field, shouldSkip);
}

function useLidoEarnVaultItemData(query, field) {
  const { id = "" } = useParams();
  const queryResult = useLidoStakingRouterQuery(query, {
    variables: {
      where: {
        id,
      },
    },
    skip: !id,
  });

  return {
    ...queryResult,
    data: queryResult.data?.[field]?.[0] || null,
    id,
  };
}

export function useLidoEarnVaultRedeemsData(type) {
  return useLidoEarnList({
    query: GET_LIDO_EARN_VAULT_REDEEMS,
    field: "earnRedeems",
    type,
  });
}

export function useLidoEarnVaultRedeemData() {
  return useLidoEarnVaultItemData(
    GET_LIDO_EARN_VAULT_REDEEM,
    "earnVaultRedeems",
  );
}

export function useLidoEarnVaultDepositsData(type) {
  return useLidoEarnList({
    query: GET_LIDO_EARN_VAULT_DEPOSITS,
    field: "earnDeposits",
    type,
  });
}

export function useLidoEarnVaultDepositData() {
  return useLidoEarnVaultItemData(
    GET_LIDO_EARN_VAULT_DEPOSIT,
    "earnVaultDeposits",
  );
}

export function useLidoEarnVaultQueuesData(type, isDepositQueue) {
  const queryResult = useLidoEarnList({
    query: GET_LIDO_EARN_VAULT_QUEUES,
    field: "earnQueues",
    type,
  });
  const items = queryResult.data?.items || [];
  const hasQueueType = items.some((item) => item.isDepositQueue != null);
  const filteredItems = items.filter(
    (item) =>
      item.active !== false &&
      (!hasQueueType || item.isDepositQueue === isDepositQueue),
  );

  return {
    ...queryResult,
    data: queryResult.data && {
      ...queryResult.data,
      items: filteredItems,
    },
  };
}

export function useLidoEarnSubvaultsData(type) {
  return useLidoEarnList({
    query: GET_LIDO_EARN_SUBVAULTS,
    field: "earnSubvaults",
    type,
  });
}
