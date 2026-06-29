import { gql } from "@apollo/client";

export const GET_LIDO_WSTETH_WRAPS = gql`
  query GetLidoWstETHWraps(
    $limit: Int!
    $offset: Int!
    $filter: IndexerFilterInput
  ) {
    wrap(limit: $limit, offset: $offset, filter: $filter) {
      items {
        address
        value
        stETHValue
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

export const GET_LIDO_WSTETH_UNWRAPS = gql`
  query GetLidoWstETHUnwraps(
    $limit: Int!
    $offset: Int!
    $filter: IndexerFilterInput
  ) {
    unwrap(limit: $limit, offset: $offset, filter: $filter) {
      items {
        address
        value
        stETHValue
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
