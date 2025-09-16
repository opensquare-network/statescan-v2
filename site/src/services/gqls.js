import { gql } from "@apollo/client";

export const GET_REGISTRARS = gql`
  query GetRegistrars {
    identityRegistrars {
      fee
      statistics {
        given
        request
        totalFee
        lastGivenIndexer {
          blockTime
          blockHeight
          extrinsicIndex
          chain
        }
      }
      index
      account
    }
  }
`;

export const GET_MULTISIGS = gql`
  query GetAccountTabMultisigs(
    $limit: Int!
    $offset: Int!
    $multisigState: MultisigState
    $account: String
    $signatory: String
  ) {
    multisigs(
      limit: $limit
      offset: $offset
      multisigState: $multisigState
      account: $account
      signatory: $signatory
    ) {
      limit
      offset
      total
      multisigs {
        address
        approvals
        call
        callHash
        indexer {
          blockHeight
          blockTime
          extrinsicIndex
        }
        state {
          name
        }
        signatories
        signatoriesCount
        threshold
      }
    }
  }
`;

export const GET_VESTINGS = gql`
  query MyQuery($limit: Int!, $offset: Int!, $address: String) {
    vestings(limit: $limit, offset: $offset, address: $address) {
      limit
      offset
      total
      vestings {
        startingBlock
        perBlock
        locked
        address
      }
    }
  }
`;

export const GET_STAKING_REWARDS = gql`
  query GetAccountTabStakingRewards(
    $limit: Int!
    $offset: Int!
    $address: String
  ) {
    stakingRewards(limit: $limit, offset: $offset, address: $address) {
      items {
        amount
        dest
        era
        indexer {
          blockHeight
          blockTime
          eventIndex
          extrinsicIndex
          blockHash
        }
        validator
        isValidator
        who
      }
      limit
      offset
      total
    }
  }
`;
