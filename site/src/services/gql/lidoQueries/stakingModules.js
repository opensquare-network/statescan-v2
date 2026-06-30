import { gql } from "@apollo/client";

export const GET_LIDO_SERVER_STAKING_MODULES = gql`
  query GetLidoServerStakingModules(
    $limit: Int!
    $offset: Int!
    $filter: IndexerFilterInput
  ) {
    stakingModules(limit: $limit, offset: $offset, filter: $filter) {
      items {
        stakingModuleId
        stakingModule
        name
        createdBy
        status
        stakingModuleFee
        treasuryFee
        targetShare
        stakeShareLimit
        priorityExitShareThreshold
        maxDepositsPerBlock
        minDepositBlockDistance
        timeline
      }
      total
      offset
      limit
    }
  }
`;

export const GET_LIDO_SERVER_STAKING_MODULE = gql`
  query GetLidoServerStakingModule($stakingModuleId: Int!) {
    stakingModule(stakingModuleId: $stakingModuleId) {
      stakingModuleId
      stakingModule
      name
      createdBy
      status
      stakingModuleFee
      treasuryFee
      targetShare
      stakeShareLimit
      priorityExitShareThreshold
      maxDepositsPerBlock
      minDepositBlockDistance
      timeline
    }
  }
`;

export const GET_LIDO_STAKING_TOTALS = gql`
  query GetLidoStakingTotals {
    stakingModules(limit: 1, offset: 0) {
      total
    }
    stakingRouterEthDeposited(limit: 1, offset: 0) {
      total
    }
    vaultHubVaults(limit: 1, offset: 0) {
      total
    }
  }
`;

export const GET_LIDO_STAKING_MODULE_TOTALS = gql`
  query GetLidoStakingModuleTotals($stakingModuleId: Int!) {
    nodeOperators(stakingModuleId: $stakingModuleId, limit: 1, offset: 0) {
      total
    }
    stakingRouterEthDeposited(
      stakingModuleId: $stakingModuleId
      limit: 1
      offset: 0
    ) {
      total
    }
  }
`;

export const GET_LIDO_SERVER_STAKING_ROUTER_ETH_DEPOSITED = gql`
  query GetLidoServerStakingRouterEthDeposited(
    $stakingModuleId: Int
    $limit: Int!
    $offset: Int!
    $filter: IndexerFilterInput
  ) {
    stakingRouterEthDeposited(
      stakingModuleId: $stakingModuleId
      limit: $limit
      offset: $offset
      filter: $filter
    ) {
      items {
        amount
        eventName
        stakingModuleId
        indexer {
          blockNumber
          blockTimestamp
          txHash
          logIndex
        }
      }
      total
      offset
      limit
    }
  }
`;
