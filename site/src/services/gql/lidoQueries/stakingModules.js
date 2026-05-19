import { gql } from "@apollo/client";

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
      nodeOperators {
        rewardsDistributedShares
      }
      priorityExitShareThreshold
      rewardDistributionState
      rewardsDistributedShares
      stakeShareLimit
      stakingModuleFee
      stakingModuleId
      status
      targetShare
      transferSharesRewardsTotal
      treasuryFee
      type
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
