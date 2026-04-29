import { gql } from "@apollo/client";

export const GET_LIDO_DEPOSITS = gql`
  query GetLidoDeposits(
    $first: Int!
    $where: Deposit_filter
    $orderBy: Deposit_orderBy
    $orderDirection: OrderDirection
  ) {
    deposits(
      first: $first
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
      id
      logIndex
      status
      value
      txHash
      shares
    }
  }
`;
