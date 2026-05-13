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

export const GET_LIDO_WITHDRAWAL_REQUESTS = gql`
  query GetLidoWithdrawalRequests(
    $first: Int!
    $where: WithdrawalRequest_filter
    $orderBy: WithdrawalRequest_orderBy
    $orderDirection: OrderDirection
  ) {
    withdrawalRequests(
      first: $first
      where: $where
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      claim {
        blockNumber
        blockTime
        logIndex
        owner
        receiver
        requestId
        txHash
        value
      }
      finalization {
        blockNumber
        blockTime
        fromRequestId
        logIndex
        shares
        timestamp
        toRequestId
        txHash
        value
      }
      blockNumber
      blockTime
      id
      logIndex
      owner
      requestor
      status
      value
      txHash
      shares
    }
  }
`;

export const GET_LIDO_WITHDRAWAL_VAULT_WITHDRAWALS_RECEIVED = gql`
  query GetLidoWithdrawalVaultWithdrawalsReceived(
    $first: Int!
    $where: WithdrawalVaultWithdrawalsReceived_filter
    $orderBy: WithdrawalVaultWithdrawalsReceived_orderBy
    $orderDirection: OrderDirection
  ) {
    withdrawalVaultWithdrawalsReceiveds(
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

export const GET_LIDO_STAKING_MODULES = gql`
  query GetLidoStakingModules(
    $first: Int!
    $where: StakingModule_filter
    $orderBy: StakingModule_orderBy
    $orderDirection: OrderDirection
  ) {
    stakingModules(
      first: $first
      where: $where
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      createdBy
      id
      maxDepositsPerBlock
      minDepositBlockDistance
      moduleAddress
      name
      priorityExitShareThreshold
      stakeShareLimit
      stakingModuleFee
      stakingModuleId
      status
      targetShare
      treasuryFee
      timelines {
        blockNumber
        blockTime
        logIndex
      }
    }
  }
`;

export const GET_LIDO_STAKING_ROUTER_ETH_DEPOSITEDS = gql`
  query GetLidoStakingRouterETHDepositeds(
    $first: Int!
    $where: StakingRouterETHDeposited_filter
    $orderBy: StakingRouterETHDeposited_orderBy
    $orderDirection: OrderDirection
  ) {
    stakingRouterETHDepositeds(
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
      stakingModule {
        id
        name
      }
      stakingModuleId
      txHash
    }
  }
`;

export const GET_LIDO_STAKING_MODULE_TIMELINES = gql`
  query GetLidoStakingModuleTimelines(
    $first: Int!
    $where: StakingModuleTimeline_filter
    $orderBy: StakingModuleTimeline_orderBy
    $orderDirection: OrderDirection
  ) {
    stakingModuleTimelines(
      first: $first
      where: $where
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      blockNumber
      blockTime
      eventType
      id
      logIndex
      stakingModuleAdded {
        blockNumber
        blockTime
        createdBy
        id
        logIndex
        name
        stakingModule
        stakingModuleId
        txHash
      }
      stakingModuleFeesSet {
        blockNumber
        blockTime
        id
        logIndex
        setBy
        stakingModuleFee
        stakingModuleId
        treasuryFee
        txHash
      }
      stakingModuleMaxDepositsPerBlockSet {
        blockNumber
        blockTime
        id
        logIndex
        maxDepositsPerBlock
        setBy
        stakingModuleId
        txHash
      }
      stakingModuleMinDepositBlockDistanceSet {
        blockNumber
        blockTime
        id
        logIndex
        minDepositBlockDistance
        setBy
        stakingModuleId
        txHash
      }
      stakingModuleShareLimitSet {
        blockNumber
        blockTime
        id
        logIndex
        priorityExitShareThreshold
        setBy
        stakeShareLimit
        stakingModuleId
        txHash
      }
      stakingModuleTargetShareSet {
        blockNumber
        blockTime
        id
        logIndex
        setBy
        stakingModuleId
        targetShare
        txHash
      }
      stakingModuleStatusSet {
        blockNumber
        blockTime
        id
        logIndex
        setBy
        stakingModuleId
        status
        txHash
      }
      stakingModuleId
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
