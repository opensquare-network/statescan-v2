import { gql } from "@apollo/client";

export const GET_LIDO_TREASURY_TRANSFERS = gql`
  query GetLidoTreasuryTransfers(
    $first: Int!
    $where: TreasuryTransfer_filter
    $orderBy: TreasuryTransfer_orderBy
    $orderDirection: OrderDirection
  ) {
    treasuryTransfers(
      first: $first
      where: $where
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      blockNumber
      blockTime
      id
      logIndex
      txHash
      stethTransfer {
        value
        shares
      }
      ethTransfer {
        value
        vault
        settledLidoFees
        cumulativeLidoFees
      }
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
