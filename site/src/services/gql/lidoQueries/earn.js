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
  query GetLidoEarnVaultRedeem($id: String!) {
    earnRedeem(id: $id) {
      id
      queue
      vault
      market
      account
      asset
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
  query GetLidoEarnVaultDeposit($id: String!) {
    earnDeposit(id: $id) {
      id
      type
      queue
      vault
      market
      account
      asset
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
  }
`;

export const GET_LIDO_EARN_VAULT_QUEUES = gql`
  query GetLidoEarnVaultQueues(
    $market: EarnMarket
    $isDepositQueue: Boolean
    $limit: Int!
    $offset: Int!
    $filter: IndexerFilterInput
  ) {
    earnQueues(
      market: $market
      isDepositQueue: $isDepositQueue
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

export const GET_LIDO_EARN_TOTALS = gql`
  query GetLidoEarnTotals($market: EarnMarket) {
    earnQueues(market: $market, limit: 1, offset: 0) {
      total
    }
    earnSubvaults(market: $market, limit: 1, offset: 0) {
      total
    }
    earnDeposits(market: $market, limit: 1, offset: 0) {
      total
    }
    earnRedeems(market: $market, limit: 1, offset: 0) {
      total
    }
  }
`;

export const GET_LIDO_EARN_ACTIVE_QUEUES = gql`
  query GetLidoEarnActiveQueues($active: Boolean, $limit: Int!, $offset: Int!) {
    earnQueues(active: $active, limit: $limit, offset: $offset) {
      items {
        asset
      }
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
