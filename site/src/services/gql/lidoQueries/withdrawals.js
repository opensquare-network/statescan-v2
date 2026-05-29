import { gql } from "@apollo/client";

export const GET_LIDO_WITHDRAWAL_REQUESTS = gql`
  query GetLidoWithdrawalRequests(
    $first: Int!
    $where: WithdrawalRequest_filter
    $orderBy: WithdrawalRequest_orderBy
    $orderDirection: OrderDirection
  ) {
    withdrawalRequests(
      first: $first
      where: $where
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      claim {
        blockNumber
        blockTime
        logIndex
        owner
        receiver
        requestId
        txHash
        value
      }
      finalization {
        blockNumber
        blockTime
        fromRequestId
        logIndex
        shares
        timestamp
        toRequestId
        txHash
        value
      }
      blockNumber
      blockTime
      cumulativeShares
      cumulativeStETH
      id
      logIndex
      owner
      requestor
      status
      value
      txHash
      shares
    }
  }
`;

export const GET_LIDO_WITHDRAWAL_VAULT_WITHDRAWALS_RECEIVED = gql`
  query GetLidoWithdrawalVaultWithdrawalsReceived(
    $first: Int!
    $where: WithdrawalVaultWithdrawalsReceived_filter
    $orderBy: WithdrawalVaultWithdrawalsReceived_orderBy
    $orderDirection: OrderDirection
  ) {
    withdrawalVaultWithdrawalsReceiveds(
      first: $first
      where: $where
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      amount
      blockNumber
      blockTime
      id
      logIndex
      txHash
    }
  }
`;
