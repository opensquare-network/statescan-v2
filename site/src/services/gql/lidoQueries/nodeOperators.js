import { gql } from "@apollo/client";

export const GET_LIDO_NODE_OPERATORS = gql`
  query GetLidoNodeOperators(
    $stakingModuleId: Int
    $limit: Int!
    $offset: Int!
    $filter: IndexerFilterInput
    $sort: TotalRewardsSortInput
  ) {
    nodeOperators(
      stakingModuleId: $stakingModuleId
      limit: $limit
      offset: $offset
      filter: $filter
      sort: $sort
    ) {
      items {
        active
        approvedValidatorsCount
        extendedManagerPermissions
        managerAddress
        name
        nodeOperatorId
        rewardAddress
        totalRewards
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
      totalRewards
      timeline
    }
  }
`;

export const GET_LIDO_NODE_OPERATOR_TOTALS = gql`
  query GetLidoNodeOperatorTotals(
    $stakingModuleId: Int!
    $nodeOperatorId: Int!
  ) {
    rewardsDistributeds(
      stakingModuleId: $stakingModuleId
      nodeOperatorId: $nodeOperatorId
      limit: 1
      offset: 0
    ) {
      total
    }
    operatorFeeDistributeds(
      nodeOperatorId: $nodeOperatorId
      limit: 1
      offset: 0
    ) {
      total
    }
    operatorRewardClaims(nodeOperatorId: $nodeOperatorId, limit: 1, offset: 0) {
      total
    }
  }
`;

export const GET_LIDO_REWARDS_DISTRIBUTEDS = gql`
  query GetLidoRewardsDistributeds(
    $stakingModuleId: Int
    $nodeOperatorId: Int
    $limit: Int!
    $offset: Int!
    $filter: IndexerFilterInput
  ) {
    rewardsDistributeds(
      stakingModuleId: $stakingModuleId
      nodeOperatorId: $nodeOperatorId
      limit: $limit
      offset: $offset
      filter: $filter
    ) {
      items {
        nodeOperatorId
        rewardAddress
        sharesAmount
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

export const GET_LIDO_OPERATOR_REWARD_CLAIMS = gql`
  query GetLidoOperatorRewardClaims(
    $nodeOperatorId: Int
    $limit: Int!
    $offset: Int!
    $filter: IndexerFilterInput
    $sort: AmountSortInput
  ) {
    operatorRewardClaims(
      nodeOperatorId: $nodeOperatorId
      limit: $limit
      offset: $offset
      filter: $filter
      sort: $sort
    ) {
      items {
        amount
        nodeOperatorId
        requestId
        to
        type
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

export const GET_LIDO_OPERATOR_FEE_DISTRIBUTEDS = gql`
  query GetLidoOperatorFeeDistributeds(
    $nodeOperatorId: Int
    $limit: Int!
    $offset: Int!
    $filter: IndexerFilterInput
    $sort: SharesSortInput
  ) {
    operatorFeeDistributeds(
      nodeOperatorId: $nodeOperatorId
      limit: $limit
      offset: $offset
      filter: $filter
      sort: $sort
    ) {
      items {
        nodeOperatorId
        shares
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
