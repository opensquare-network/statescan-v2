import { useParams } from "react-router-dom";
import {
  GET_LIDO_EARN_VAULT_DEPOSIT,
  GET_LIDO_EARN_VAULT_REDEEM,
  GET_LIDO_EARN_VAULT_DEPOSITS,
  GET_LIDO_EARN_VAULT_QUEUES,
  GET_LIDO_EARN_VAULT_REDEEMS,
  GET_LIDO_EARN_SUBVAULTS,
} from "../../services/gql/lido";
import { useLidoServerQuery } from "./useLidoQuery";
import { useLidoServerListQuery } from "./useLidoList";

const EARN_LIST_PAGE_SIZE = 25;
const markets = {
  eth: "ETH",
  usd: "USD",
};

function useLidoEarnList({ query, field, type, variables: extraVariables }) {
  const market = markets[type];
  const shouldSkip = !market;

  return useLidoServerListQuery({
    query,
    field,
    pageSize: EARN_LIST_PAGE_SIZE,
    variables: {
      market,
      ...extraVariables,
    },
    skip: shouldSkip,
  });
}

function useLidoEarnVaultItemData(query, field) {
  const { id = "" } = useParams();
  const queryResult = useLidoServerQuery(query, {
    variables: {
      id,
    },
    skip: !id,
  });

  return {
    ...queryResult,
    data: queryResult.data?.[field] || null,
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
  return useLidoEarnVaultItemData(GET_LIDO_EARN_VAULT_REDEEM, "earnRedeem");
}

export function useLidoEarnVaultDepositsData(type) {
  return useLidoEarnList({
    query: GET_LIDO_EARN_VAULT_DEPOSITS,
    field: "earnDeposits",
    type,
  });
}

export function useLidoEarnVaultDepositData() {
  return useLidoEarnVaultItemData(GET_LIDO_EARN_VAULT_DEPOSIT, "earnDeposit");
}

export function useLidoEarnVaultQueuesData(type, isDepositQueue) {
  return useLidoEarnList({
    query: GET_LIDO_EARN_VAULT_QUEUES,
    field: "earnQueues",
    type,
    variables: {
      isDepositQueue,
    },
  });
}

export function useLidoEarnSubvaultsData(type) {
  return useLidoEarnList({
    query: GET_LIDO_EARN_SUBVAULTS,
    field: "earnSubvaults",
    type,
  });
}
