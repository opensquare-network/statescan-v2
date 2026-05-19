import { gql } from "@apollo/client";

export const GET_LIDO_NODE_OPERATORS = gql`
  query GetLidoNodeOperators(
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
