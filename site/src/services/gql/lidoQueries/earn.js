import { gql } from "@apollo/client";

export const GET_LIDO_EARN_VAULT_REDEEMS = gql`
  query GetLidoEarnVaultRedeems(
    $market: EarnMarket
    $limit: Int!
    $offset: Int!
    $filter: IndexerFilterInput
  ) {
    earnRedeems(
      market: $market
      limit: $limit
      offset: $offset
      filter: $filter
    ) {
      items {
        id
        queue
        vault
        market
        asset
        account
        receiver
        shares
        assets
        requestTime
        status
        claimed
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

export const GET_LIDO_EARN_VAULT_REDEEM = gql`
  query GetLidoEarnVaultRedeem($where: EarnVaultRedeem_filter) {
    earnVaultRedeems(first: 1, where: $where) {
      account
      asset
      blockNumber
      blockTime
      claimed {
        account
        asset
        assets
        blockNumber
        blockTime
        id
        logIndex
        queue
        receiver
        requestTime
        txHash
        vault
      }
      vault
      status
      shares
      requestTime
      queue
      id
      logIndex
      txHash
    }
  }
`;

export const GET_LIDO_EARN_VAULT_DEPOSITS = gql`
  query GetLidoEarnVaultDeposits(
    $market: EarnMarket
    $limit: Int!
    $offset: Int!
    $filter: IndexerFilterInput
  ) {
    earnDeposits(
      market: $market
      limit: $limit
      offset: $offset
      filter: $filter
    ) {
      items {
        id
        type
        queue
        vault
        market
        asset
        account
        referral
        assets
        shares
        fees
        requestTime
        status
        claimed
        canceled
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

export const GET_LIDO_EARN_VAULT_DEPOSIT = gql`
  query GetLidoEarnVaultDeposit($where: EarnVaultDeposit_filter) {
    earnVaultDeposits(first: 1, where: $where) {
      account
      asset
      assets
      blockNumber
      blockTime
      canceled {
        account
        asset
        assets
        blockNumber
        blockTime
        id
        logIndex
        queue
        requestTime
        txHash
        vault
      }
      claimed {
        account
        asset
        blockNumber
        blockTime
        id
        logIndex
        queue
        requestTime
        shares
        txHash
        vault
      }
      id
      queue
      referral
      requestTime
      status
      shares
      type
      vault
      logIndex
      txHash
    }
  }
`;

export const GET_LIDO_EARN_VAULT_QUEUES = gql`
  query GetLidoEarnVaultQueues(
    $market: EarnMarket
    $limit: Int!
    $offset: Int!
    $filter: IndexerFilterInput
  ) {
    earnQueues(
      market: $market
      limit: $limit
      offset: $offset
      filter: $filter
    ) {
      items {
        queue
        vault
        market
        asset
        isDepositQueue
        queueType
        active
        paused
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

export const GET_LIDO_EARN_ACTIVE_QUEUES = gql`
  query GetLidoEarnActiveQueues($first: Int!, $where: EarnVaultQueue_filter) {
    earnVaultQueues(first: $first, where: $where) {
      asset
      blockTime
      id
      logIndex
      txHash
    }
  }
`;

export const GET_LIDO_EARN_SUBVAULTS = gql`
  query GetLidoEarnSubvaults(
    $market: EarnMarket
    $limit: Int!
    $offset: Int!
    $filter: IndexerFilterInput
  ) {
    earnSubvaults(
      market: $market
      limit: $limit
      offset: $offset
      filter: $filter
    ) {
      items {
        vault
        market
        subvault
        owner
        verifier
        version
        connected
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
