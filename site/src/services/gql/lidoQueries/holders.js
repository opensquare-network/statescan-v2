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
