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

export const GET_FOREIGN_ACCOUNT_ASSET = gql`
  query MyQuery($limit: Int!, $offset: Int!, $address: String!) {
    accountForeignAssets(address: $address, limit: $limit, offset: $offset) {
      limit
      offset
      total
      holders {
        address
        asset {
          assetHeight
          assetId
          detail {
            accounts
            admin
            approvals
            freezer
            deposit
            isSufficient
            issuer
            minBalance
            owner
            status
            sufficients
            supply
          }
          location
          metadata {
            decimals
            deposit
            isFrozen
            name
            symbol
          }
        }
        assetId
        balance
        extra
        reason
        status
      }
    }
  }
`;
