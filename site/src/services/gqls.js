import { gql } from "@apollo/client";

export const GET_REGISTRARS = gql`
  query GetRegistrars {
    registrars {
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
