import { gql } from "@apollo/client";

export const GET_LIDO_WSTETH_WRAPS = gql`
  query GetLidoWstETHWraps(
    $limit: Int!
    $offset: Int!
    $address: String
    $filter: IndexerFilterInput
    $sort: ValueSortInput
  ) {
    wrap(
      limit: $limit
      offset: $offset
      address: $address
      filter: $filter
      sort: $sort
    ) {
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
    $address: String
    $filter: IndexerFilterInput
    $sort: ValueSortInput
  ) {
    unwrap(
      limit: $limit
      offset: $offset
      address: $address
      filter: $filter
      sort: $sort
    ) {
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
