import { gql } from "@apollo/client";

export const GET_FOREIGN_ASSETS_LIST = gql`
  query MyQuery($limit: Int!, $offset: Int!) {
    foreignAssets(limit: $limit, offset: $offset, sort: HOLDERS_DESC) {
      assets {
        assetId
        location
        metadata {
          decimals
          name
          symbol
        }
        detail {
          accounts
          owner
          supply
          minBalance
          admin
          issuer
        }
        assetHeight
      }
      total
      offset
    }
  }
`;
