import { gql } from "@apollo/client";

export const GET_LIDO_EARN_VAULT_REDEEMS = gql`
  query GetLidoEarnVaultRedeems(
    $first: Int!
    $where: EarnVaultRedeem_filter
    $orderBy: EarnVaultRedeem_orderBy
    $orderDirection: OrderDirection
  ) {
    earnVaultRedeems(
      first: $first
      where: $where
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
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
    $first: Int!
    $where: EarnVaultDeposit_filter
    $orderBy: EarnVaultDeposit_orderBy
    $orderDirection: OrderDirection
  ) {
    earnVaultDeposits(
      first: $first
      where: $where
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
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
    $first: Int!
    $where: EarnVaultQueue_filter
    $orderBy: EarnVaultQueue_orderBy
    $orderDirection: OrderDirection
  ) {
    earnVaultQueues(
      first: $first
      where: $where
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      active
      asset
      blockTime
      id
      isDepositQueue
      logIndex
      paused
      queueType
      txHash
      vault
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
    $first: Int!
    $where: EarnVaultSubvault_filter
    $orderBy: EarnVaultSubvault_orderBy
    $orderDirection: OrderDirection
  ) {
    earnVaultSubvaults(
      first: $first
      where: $where
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      blockNumber
      blockTime
      connected
      id
      logIndex
      owner
      subvault
      txHash
      vaultAddress
      verifier
      version
    }
  }
`;
