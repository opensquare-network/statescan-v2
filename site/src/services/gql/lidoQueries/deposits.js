import { gql } from "@apollo/client";

export const GET_LIDO_SERVER_DEPOSITS = gql`
  query GetLidoDeposits(
    $limit: Int!
    $offset: Int!
    $address: String
    $filter: IndexerFilterInput
    $sort: ValueSortInput
  ) {
    deposits(
      limit: $limit
      offset: $offset
      address: $address
      filter: $filter
      sort: $sort
    ) {
      items {
        address
        referral
        value
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
