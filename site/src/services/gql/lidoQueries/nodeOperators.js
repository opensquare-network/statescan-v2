import { gql } from "@apollo/client";

export const GET_LIDO_NODE_OPERATORS = gql`
  query GetLidoNodeOperators(
    $stakingModuleId: Int
    $limit: Int!
    $offset: Int!
    $filter: IndexerFilterInput
  ) {
    nodeOperators(
      stakingModuleId: $stakingModuleId
      limit: $limit
      offset: $offset
      filter: $filter
    ) {
      items {
        active
        approvedValidatorsCount
        extendedManagerPermissions
        managerAddress
        name
        nodeOperatorId
        rewardAddress
        stakingModuleId
      }
      total
      offset
      limit
    }
  }
`;

export const GET_LIDO_SERVER_NODE_OPERATOR = gql`
  query GetLidoServerNodeOperator(
    $stakingModuleId: Int!
    $nodeOperatorId: Int!
  ) {
    nodeOperator(
      stakingModuleId: $stakingModuleId
      nodeOperatorId: $nodeOperatorId
    ) {
      active
      approvedValidatorsCount
      extendedManagerPermissions
      managerAddress
      name
      nodeOperatorId
      rewardAddress
      stakingModuleId
      timeline
    }
  }
`;

export const GET_LIDO_NODE_OPERATOR = gql`
  query GetLidoNodeOperator(
    $first: Int!
    $where: NodeOperator_filter
    $orderBy: NodeOperator_orderBy
    $orderDirection: OrderDirection
  ) {
    nodeOperators(
      first: $first
      where: $where
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      active
      extendedManagerPermissions
      id
      managerAddress
      name
      nodeOperatorId
      rewardAddress
      rewardsDistributedShares
      stakingModuleId
      vettedSigningKeysCount
      timelines {
        blockNumber
        blockTime
        eventType
        id
        logIndex
        nodeOperatorId
        stakingModuleId
        txHash
        nodeOperator {
          active
          extendedManagerPermissions
          id
          managerAddress
          name
          nodeOperatorId
          rewardAddress
          rewardsDistributedShares
          stakingModuleId
          vettedSigningKeysCount
        }
        nodeOperatorActiveSet {
          active
          blockNumber
          blockTime
          id
          logIndex
          nodeOperatorId
          txHash
        }
        nodeOperatorAdded {
          blockNumber
          blockTime
          extendedManagerPermissions
          id
          logIndex
          managerAddress
          name
          nodeOperatorId
          rewardAddress
          stakingLimit
          txHash
        }
        nodeOperatorNameSet {
          blockNumber
          blockTime
          id
          logIndex
          name
          nodeOperatorId
          txHash
        }
        nodeOperatorVettedSigningKeysCountChanged {
          blockNumber
          blockTime
          id
          logIndex
          nodeOperatorId
          txHash
          vettedSigningKeysCount
        }
      }
    }
  }
`;

export const GET_LIDO_REWARDS_DISTRIBUTEDS = gql`
  query GetLidoRewardsDistributeds(
    $first: Int!
    $where: RewardsDistributed_filter
    $orderBy: RewardsDistributed_orderBy
    $orderDirection: OrderDirection
  ) {
    rewardsDistributeds(
      first: $first
      where: $where
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      blockNumber
      blockTime
      id
      logIndex
      nodeOperatorId
      rewardAddress
      sharesAmount
      stakingModuleId
      txHash
    }
  }
`;

export const GET_LIDO_OPERATOR_REWARD_CLAIMS = gql`
  query GetLidoOperatorRewardClaims(
    $first: Int!
    $where: OperatorRewardClaim_filter
    $orderBy: OperatorRewardClaim_orderBy
    $orderDirection: OrderDirection
  ) {
    operatorRewardClaims(
      first: $first
      where: $where
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      blockNumber
      blockTime
      claimAddress
      claimedShares
      claimedWstETHAmount
      cumulativeFeeShares
      id
      nodeOperatorId
      requestId
      requestedAmount
      txHash
      type
    }
  }
`;

export const GET_LIDO_OPERATOR_FEE_DISTRIBUTEDS = gql`
  query GetLidoOperatorFeeDistributeds(
    $first: Int!
    $where: OperatorFeeDistributed_filter
    $orderBy: OperatorFeeDistributed_orderBy
    $orderDirection: OrderDirection
  ) {
    operatorFeeDistributeds(
      first: $first
      where: $where
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      blockNumber
      blockTime
      id
      logIndex
      nodeOperatorId
      shares
      txHash
    }
  }
`;
