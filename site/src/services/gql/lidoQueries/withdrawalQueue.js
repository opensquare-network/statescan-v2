import { gql } from "@apollo/client";

export const GET_LIDO_WITHDRAWAL_QUEUE_FINALIZATIONS = gql`
  query GetLidoWithdrawalQueueFinalizations(
    $first: Int!
    $where: WithdrawalFinalization_filter
    $orderBy: WithdrawalFinalization_orderBy
    $orderDirection: OrderDirection
  ) {
    withdrawalFinalizations(
      first: $first
      where: $where
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      blockNumber
      blockTime
      fromRequestId
      id
      logIndex
      shares
      timestamp
      toRequestId
      txHash
      value
    }
  }
`;
