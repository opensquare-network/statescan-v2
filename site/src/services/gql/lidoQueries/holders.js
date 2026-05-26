import { gql } from "@apollo/client";

export const GET_LIDO_STETH_HOLDERS = gql`
  query GetLidoStETHHolders(
    $first: Int!
    $where: StETHHolder_filter
    $orderBy: StETHHolder_orderBy
    $orderDirection: OrderDirection
  ) {
    stETHHolders(
      first: $first
      where: $where
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      id
      shares
      updatedAtTime
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

export const GET_LIDO_STETH_HOLDER = gql`
  query GetLidoStETHHolder($where: StETHHolder_filter) {
    stETHHolders(first: 1, where: $where) {
      id
      shares
    }
  }
`;

export const GET_LIDO_WSTETH_HOLDER = gql`
  query GetLidoWstETHHolder($where: WstETHHolder_filter) {
    wstETHHolders(first: 1, where: $where) {
      balance
      id
    }
  }
`;
