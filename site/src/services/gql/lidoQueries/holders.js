import { gql } from "@apollo/client";

export const GET_LIDO_STETH_HOLDERS = gql`
  query GetLidoStETHHolders($limit: Int!, $offset: Int!) {
    stethHolders(limit: $limit, offset: $offset) {
      items {
        address
        shares
      }
      total
      offset
      limit
    }
  }
`;

export const GET_LIDO_WSTETH_HOLDERS = gql`
  query GetLidoWstETHHolders(
    $first: Int!
    $where: WstETHHolder_filter
    $orderBy: WstETHHolder_orderBy
    $orderDirection: OrderDirection
  ) {
    wstETHHolders(
      first: $first
      where: $where
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      balance
      id
      updatedAtTime
    }
  }
`;

export const GET_LIDO_STETH_TOTALS = gql`
  query GetLidoStETHTotals {
    deposits(limit: 1, offset: 0) {
      total
    }
    withdrawals(limit: 1, offset: 0) {
      total
    }
    stethHolders(limit: 1, offset: 0) {
      total
    }
  }
`;
