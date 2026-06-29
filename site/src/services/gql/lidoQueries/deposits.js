import { gql } from "@apollo/client";

export const GET_LIDO_DEPOSITS = gql`
  query GetLidoDeposits(
    $limit: Int!
    $offset: Int!
    $filter: IndexerFilterInput
  ) {
    deposits(limit: $limit, offset: $offset, filter: $filter) {
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
