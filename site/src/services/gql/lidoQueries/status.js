import { gql } from "@apollo/client";

export const GET_LIDO_STATUS = gql`
  query GetLidoStatus($key: String!) {
    status(key: $key) {
      key
      value
    }
  }
`;
