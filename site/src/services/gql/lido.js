import { gql } from "@apollo/client";

export const GET_LIDO_DEPOSITS = gql`
  query GetLidoDeposits(
    $includeStats: Boolean!
    $first: Int!
    $skip: Int!
    $where: Deposit_filter
    $orderBy: Deposit_orderBy
    $orderDirection: OrderDirection
  ) {
    paginationStat(id: "global") @include(if: $includeStats) {
      depositCount
    }
    deposits(
      first: $first
      skip: $skip
      where: $where
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      address
      blockNumber
      blockTime
      id
      logIndex
      referral
      txHash
      value
    }
  }
`;

export const GET_LIDO_WITHDRAWAL_REQUESTS = gql`
  query GetLidoWithdrawalRequests(
    $includeStats: Boolean!
    $first: Int!
    $skip: Int!
    $where: WithdrawalRequest_filter
    $orderBy: WithdrawalRequest_orderBy
    $orderDirection: OrderDirection
  ) {
    paginationStat(id: "global") @include(if: $includeStats) {
      withdrawalClaimCount
      withdrawalFinalizationCount
      withdrawalRequestCount
    }
    withdrawalRequests(
      first: $first
      skip: $skip
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
      id
      logIndex
      status
      value
      txHash
      shares
    }
  }
`;
