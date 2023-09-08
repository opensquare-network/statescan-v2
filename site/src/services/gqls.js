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
