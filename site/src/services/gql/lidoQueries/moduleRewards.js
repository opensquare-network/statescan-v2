import { gql } from "@apollo/client";

export const GET_LIDO_MODULE_REWARDS = gql`
  query GetLidoModuleRewards(
    $stakingModuleId: Int
    $limit: Int!
    $offset: Int!
    $filter: IndexerFilterInput
  ) {
    stethCsmRewards(
      stakingModuleId: $stakingModuleId
      limit: $limit
      offset: $offset
      filter: $filter
    ) {
      items {
        sharesValue
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
