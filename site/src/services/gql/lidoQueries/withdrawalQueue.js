import { gql } from "@apollo/client";

export const GET_LIDO_WITHDRAWAL_QUEUE_FINALIZATIONS = gql`
  query GetLidoWithdrawalQueueFinalizations(
    $limit: Int!
    $offset: Int!
    $filter: IndexerFilterInput
  ) {
    withdrawalFinalized(limit: $limit, offset: $offset, filter: $filter) {
      items {
        fromRequestId
        toRequestId
        amountOfETHLocked
        sharesToBurn
        timestamp
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
