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
  query GetLidoWstETHHolders($limit: Int!, $offset: Int!) {
    wstethHolders(limit: $limit, offset: $offset) {
      items {
        address
        balance
      }
      total
      offset
      limit
    }
  }
`;

export const GET_LIDO_SERVER_STETH_TOTALS = gql`
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

export const GET_LIDO_SERVER_WSTETH_TOTALS = gql`
  query GetLidoWstETHTotals {
    wrap(limit: 1, offset: 0) {
      total
    }
    unwrap(limit: 1, offset: 0) {
      total
    }
    wstethHolders(limit: 1, offset: 0) {
      total
    }
  }
`;
