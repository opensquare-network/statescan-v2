import { gql } from "@apollo/client";

export const GET_LIDO_REWARDS_VAULT_ETH_RECEIVED = gql`
  query GetLidoRewardsVaultETHReceived(
    $first: Int!
    $where: RewardsVaultETHReceived_filter
    $orderBy: RewardsVaultETHReceived_orderBy
    $orderDirection: OrderDirection
  ) {
    rewardsVaultETHReceiveds(
      first: $first
      where: $where
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      amount
      blockNumber
      blockTime
      id
      logIndex
      txHash
    }
  }
`;

export const GET_LIDO_VAULTS = gql`
  query GetLidoVaults(
    $first: Int!
    $where: Vault_filter
    $orderBy: Vault_orderBy
    $orderDirection: OrderDirection
  ) {
    vaults(
      first: $first
      where: $where
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      id
      nodeOperator
      reserveRatioBP
      status
      statusOrder
      updatedAtBlock
      timelines {
        eventType
        txHash
        blockTime
      }
      lastReport {
        blockTime
        blockNumber
        id
        inOutDelta
        logIndex
        timestamp
        totalValue
        txHash
      }
    }
  }
`;

export const GET_LIDO_VAULT = gql`
  query GetLidoVault(
    $first: Int!
    $where: Vault_filter
    $orderBy: Vault_orderBy
    $orderDirection: OrderDirection
  ) {
    vaults(
      first: $first
      where: $where
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      admin
      dashboard
      forcedRebalanceThresholdBP
      id
      infraFeeBP
      liquidityFeeBP
      nodeOperator
      reservationFeeBP
      reserveRatioBP
      shareLimit
      status
      updatedAtBlock
      lastReport {
        blockNumber
        blockTime
        id
        inOutDelta
        logIndex
        timestamp
        totalValue
        txHash
      }
      timelines {
        eventType
        txHash
        blockTime
        blockNumber
        id
        logIndex
        vaultAddress
        dashboardCreated {
          admin
          blockNumber
          blockTime
          dashboard
          id
          logIndex
          txHash
        }
        vaultConnected {
          blockNumber
          blockTime
          id
          infraFeeBP
          liquidityFeeBP
          logIndex
          rebalanceThresholdBP
          reservationFeeBP
          reserveRatioBP
          shareLimit
          txHash
        }
        vaultConnectionUpdated {
          blockNumber
          blockTime
          id
          logIndex
          nodeOperator
          rebalanceThresholdBP
          reserveRatioBP
          shareLimit
          txHash
        }
        vaultDisconnectAborted {
          blockNumber
          blockTime
          id
          logIndex
          slashingReserve
          txHash
        }
        vaultFeesUpdated {
          blockNumber
          blockTime
          id
          infraFeeBP
          liquidityFeeBP
          logIndex
          previousInfraFeeBP
          previousLiquidityFeeBP
          previousReservationFeeBP
          reservationFeeBP
          txHash
        }
        vaultReportApplied {
          blockNumber
          blockTime
          cumulativeLidoFees
          id
          inOutDelta
          liabilityShares
          logIndex
          maxLiabilityShares
          slashingReserve
          timestamp
          totalValue
          txHash
        }
      }
    }
  }
`;
