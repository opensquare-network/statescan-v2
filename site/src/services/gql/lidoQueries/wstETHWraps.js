import { gql } from "@apollo/client";

export const GET_LIDO_WSTETH_WRAPS = gql`
  query GetLidoWstETHWraps(
    $first: Int!
    $where: WstETHWrap_filter
    $orderBy: WstETHWrap_orderBy
    $orderDirection: OrderDirection
  ) {
    wstETHWraps(
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
      stETHValue
      txHash
      value
    }
  }
`;

export const GET_LIDO_WSTETH_UNWRAPS = gql`
  query GetLidoWstETHUnwraps(
    $first: Int!
    $where: WstETHUnwrap_filter
    $orderBy: WstETHUnwrap_orderBy
    $orderDirection: OrderDirection
  ) {
    wstETHUnwraps(
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
      stETHValue
      txHash
      value
    }
  }
`;
