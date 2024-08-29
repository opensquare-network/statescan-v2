import { gql, useQuery } from "@apollo/client";

const GET_ACCOUNT_INFO = gql`
  query GetAccountInfo($address: String!) {
    chainAccount(address: $address) {
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
  return useQuery(GET_ACCOUNT_INFO, {
    variables: {
      address,
    },
  });
}
