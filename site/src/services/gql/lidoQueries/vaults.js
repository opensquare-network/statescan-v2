import { gql } from "@apollo/client";

export const GET_LIDO_REWARDS_VAULT_ETH_RECEIVED = gql`
  query GetLidoRewardsVaultETHReceived(
    $limit: Int!
    $offset: Int!
    $filter: IndexerFilterInput
    $sort: AmountSortInput
  ) {
    rewardsVaultReceived(
      limit: $limit
      offset: $offset
      filter: $filter
      sort: $sort
    ) {
      items {
        amount
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

export const GET_LIDO_VAULTS = gql`
  query GetLidoVaults(
    $limit: Int!
    $offset: Int!
    $filter: IndexerFilterInput
  ) {
    vaultHubVaults(limit: $limit, offset: $offset, filter: $filter) {
      items {
        vault
        nodeOperator
        reserveRatioBP
        status
        lastReport
      }
      total
      offset
      limit
    }
  }
`;

export const GET_LIDO_VAULT = gql`
  query GetLidoVault($vault: String!) {
    vaultHubVault(vault: $vault) {
      vault
      dashboard
      admin
      nodeOperator
      status
      shareLimit
      reserveRatioBP
      forcedRebalanceThresholdBP
      infraFeeBP
      liquidityFeeBP
      reservationFeeBP
      lastReport
      timeline
    }
  }
`;
