import { gql } from "@apollo/client";

export const GET_LIDO_SERVER_USER_STAKING_STATS = gql`
  query GetLidoServerUserStakingStats($days: Int!) {
    userStakingStats(days: $days) {
      deposits {
        count
        amount
      }
      withdrawals {
        count
        amount
      }
    }
  }
`;

export const GET_LIDO_SERVER_LAST_DAILY_STATS = gql`
  query GetLidoServerLastDailyStats {
    lastDailyStats {
      date
      rewardsVaultETHReceivedAmount
      rewardsVaultETHReceivedCount
      stethHolders
      stethShares
      stethSupply
      withdrawalVaultETHReceivedAmount
      withdrawalVaultETHReceivedCount
      wstethHolders
      wstethSupply
    }
  }
`;

export const GET_LIDO_SERVER_STETH_DAILY_STATS = gql`
  query GetLidoServerStETHDailyStats {
    stEthDailyStats {
      date
      stethHolders
      stethSupply
      stethShares
    }
  }
`;

export const GET_LIDO_SERVER_WSTETH_DAILY_STATS = gql`
  query GetLidoServerWstETHDailyStats {
    wstEthDailyStats {
      date
      wstethHolders
      wstethSupply
    }
  }
`;
