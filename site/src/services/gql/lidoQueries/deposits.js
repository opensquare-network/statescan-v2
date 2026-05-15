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
