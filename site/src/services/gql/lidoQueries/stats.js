import { gql } from "@apollo/client";

export const GET_LIDO_DAILY_STATS = gql`
  query GetLidoDailyStats(
    $first: Int!
    $orderBy: DailyStat_orderBy
    $orderDirection: OrderDirection
  ) {
    dailyStats(
      interval: day
      first: $first
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      id
      depositCount
      depositValue
      timestamp
      stETHTotalSupply
      wstETHTotalSupply
      stETHHolderCount
      wstETHHolderCount
      withdrawalRequestCount
      withdrawalRequestValue
    }
  }
`;

export const GET_LIDO_STETH_DAILY_STATS_ANALYTICS = gql`
  query GetLidoStETHDailyStatsAnalytics(
    $first: Int!
    $where: DailyStat_filter
    $orderBy: DailyStat_orderBy
    $orderDirection: OrderDirection
  ) {
    dailyStats(
      interval: day
      first: $first
      where: $where
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      id
      timestamp
      stETHHolderCount
    }
  }
`;

export const GET_LIDO_WSTETH_DAILY_STATS_ANALYTICS = gql`
  query GetLidoWstETHDailyStatsAnalytics(
    $first: Int!
    $where: DailyStat_filter
    $orderBy: DailyStat_orderBy
    $orderDirection: OrderDirection
  ) {
    dailyStats(
      interval: day
      first: $first
      where: $where
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      id
      timestamp
      wstETHHolderCount
    }
  }
`;

export const GET_LIDO_PROTOCOL_STAT = gql`
  query GetLidoProtocolStat($id: String!) {
    protocolStat(id: $id) {
      count
      id
      updatedAtBlock
      updatedAtTime
      value
    }
  }
`;

export const GET_LIDO_SERVER_STETH_DAILY_STATS = gql`
  query GetLidoServerStETHDailyStats {
    stEthDailyStats {
      totalSupply
      timestamp
    }
  }
`;

export const GET_LIDO_SERVER_WSTETH_DAILY_STATS = gql`
  query GetLidoServerWstETHDailyStats {
    wstEthDailyStats {
      totalSupply
      timestamp
    }
  }
`;
