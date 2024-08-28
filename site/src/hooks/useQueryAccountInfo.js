import { gql } from "@apollo/client";
import { useAccountQuery } from "./apollo";

const GET_ACCOUNT_INFO = gql`
  query GetAccountInfo($address: String!) {
    account(address: $address) {
      data {
        feeFrozen
        free
        miscFrozen
        reserved
        lockedBalance
        lockedBreakdown {
          amount
          id
          reasons
        }
        reservedBreakdown {
          amount
          id
        }
        total
        transferrable
      }
      detail {
        consumers
        data {
          feeFrozen
          free
          miscFrozen
          reserved
        }
        nonce
        providers
      }
    }
  }
`;

export function useQueryAccountInfo(address) {
  return useAccountQuery(GET_ACCOUNT_INFO, {
    variables: {
      address,
    },
  });
}
