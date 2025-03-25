import { gql } from "@apollo/client";
export const GET_FOREIGN_ASSET_DETAIL = gql`
  query MyQuery($id: String!) {
    foreignAsset(id: $id) {
      assetId
      location
      detail {
        accounts
        owner
        status
        supply
        issuer
        freezer
        deposit
        admin
        sufficients
        minBalance
        isSufficient
        approvals
      }
      metadata {
        decimals
        deposit
        isFrozen
        name
        symbol
      }
      assetHeight
    }
  }
`;

export const GET_FOREIGN_ASSET_COUNTS = gql`
  query MyQuery($assetId: String!) {
    foreignAssetHolders(assetId: $assetId, limit: 10, offset: 0) {
      total
    }
    foreignAssetTimeline(assetId: $assetId, limit: 10, offset: 0) {
      total
    }
    foreignAssetTransfers(assetId: $assetId, limit: 10, offset: 0) {
      total
    }
  }
`;

export const GET_FOREIGN_ASSET_TRANSFERS_LIST = gql`
  query MyQuery($limit: Int!, $offset: Int!, $assetId: String!) {
    foreignAssetTransfers(limit: $limit, offset: $offset, assetId: $assetId) {
      total
      limit
      offset
      transfers {
        balance
        from
        to
        indexer {
          blockHash
          blockHeight
          blockTime
          chain
          eventIndex
          extrinsicIndex
        }
      }
    }
  }
`;

export const GET_FOREIGN_ASSET_HOLDERS_LIST = gql`
  query MyQuery($limit: Int!, $offset: Int!, $assetId: String!) {
    foreignAssetHolders(assetId: $assetId, limit: $limit, offset: $offset) {
      holders {
        address
        asset {
          assetHeight
          assetId
          detail {
            accounts
            admin
            approvals
            deposit
            freezer
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
        balance
        status
      }
      limit
      offset
      total
    }
  }
`;

export const GET_FOREIGN_ASSET_TIMELINE_LIST = gql`
  query MyQuery($limit: Int!, $offset: Int!, $assetId: String!) {
    foreignAssetTimeline(assetId: $assetId, limit: $limit, offset: $offset) {
      items {
        args
        assetId
        indexer {
          blockHash
          blockHeight
          blockTime
          chain
          eventIndex
          extrinsicIndex
        }
        name
      }
      limit
      offset
      total
    }
  }
`;
