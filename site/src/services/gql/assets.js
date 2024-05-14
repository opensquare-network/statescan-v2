import { gql } from "@apollo/client";

export const ASSETS_LIST = gql`
  query MyQuery(
    $limit: Int!
    $offset: Int!
    $sort: AssetSort
    $destroyed: Boolean
  ) {
    assets(limit: $limit, offset: $offset, sort: $sort, destroyed: $destroyed) {
      limit
      offset
      total
      assets {
        assetId
        metadata {
          name
          symbol
          decimals
        }
        detail {
          accounts
          issuer
          owner
          supply
        }
        destroyed
        assetHeight
      }
    }
  }
`;
