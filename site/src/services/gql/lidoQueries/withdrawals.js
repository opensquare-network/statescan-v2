import { gql } from "@apollo/client";

export const GET_LIDO_WITHDRAWALS = gql`
  query GetLidoWithdrawals(
    $limit: Int!
    $offset: Int!
    $status: WithdrawalStatus
    $filter: IndexerFilterInput
  ) {
    withdrawals(
      limit: $limit
      offset: $offset
      status: $status
      filter: $filter
    ) {
      items {
        requestId
        requester
        owner
        amountOfStETH
        amountOfShares
        status
        indexer {
          blockNumber
          blockTimestamp
          txHash
          logIndex
        }
      }
      total
      offset
      limit
    }
  }
`;

export const GET_LIDO_WITHDRAWAL = gql`
  query GetLidoWithdrawal($requestId: Int!) {
    withdrawal(requestId: $requestId) {
      requestId
      requester
      owner
      amountOfStETH
      amountOfShares
      status
      timeline
      indexer {
        blockNumber
        blockTimestamp
        txHash
        logIndex
      }
    }
  }
`;

export const GET_LIDO_WITHDRAWAL_VAULT_WITHDRAWALS_RECEIVED = gql`
  query GetLidoWithdrawalVaultWithdrawalsReceived(
    $limit: Int!
    $offset: Int!
    $filter: IndexerFilterInput
  ) {
    withdrawalVaultReceived(limit: $limit, offset: $offset, filter: $filter) {
      items {
        amount
        indexer {
          blockNumber
          blockTimestamp
          txHash
          logIndex
        }
      }
      total
      offset
      limit
    }
  }
`;
