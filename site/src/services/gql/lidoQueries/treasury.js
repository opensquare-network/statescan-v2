import { gql } from "@apollo/client";

export const GET_LIDO_TREASURY_ETH_INCOME = gql`
  query GetLidoTreasuryEthIncome(
    $limit: Int!
    $offset: Int!
    $filter: IndexerFilterInput
  ) {
    treasuryEthIncome: treasuryEthTransfers(
      limit: $limit
      offset: $offset
      filter: $filter
    ) {
      items {
        value
        vault
        settledLidoFees
        cumulativeLidoFees
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

export const GET_LIDO_TREASURY_STETH_INCOME = gql`
  query GetLidoTreasuryStethIncome(
    $limit: Int!
    $offset: Int!
    $filter: IndexerFilterInput
  ) {
    treasuryStethIncome: treasuryStethTransfers(
      limit: $limit
      offset: $offset
      filter: $filter
    ) {
      items {
        value
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

export const GET_LIDO_TREASURY_TOKENS_STATUS = gql`
  query GetLidoTreasuryTokensStatus {
    status(key: "lido-treasury-positions") {
      key
      value
    }
  }
`;
