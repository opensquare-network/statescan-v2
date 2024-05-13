import { gql } from "@apollo/client";

export const GET_REGISTRARS = gql`
  query GetRegistrars {
    identityRegistrars {
      fee
      statistics {
        given
        request
        totalFee
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
  ) {
    multisigs(
      limit: $limit
      offset: $offset
      multisigState: $multisigState
      account: $account
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
    vestings(limit: 10, offset: 0, address: "") {
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
