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
      id
      name
      nodeOperatorId
      rewardAddress
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
      id
      name
      nodeOperatorId
      rewardAddress
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
          id
          name
          nodeOperatorId
          rewardAddress
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
          id
          logIndex
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
