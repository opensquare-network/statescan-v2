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
      depositCount
      depositValue
      timestamp
      withdrawalRequestCount
      withdrawalRequestValue
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
