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

export const ASSET_DETAIL = gql`
  query MyQuery($height: Int, $id: Int!) {
    asset(id: $id, height: $height) {
      detail {
        accounts
        admin
        owner
        issuer
        freezer
        supply
      }
      destroyed
      metadata {
        name
        symbol
        decimals
      }
      assetId
      assetHeight
    }
  }
`;

export const ASSET_TRANSFERS_LIST = gql`
  query MyQuery($limit: Int!, $offset: Int!, $assetId: Int!) {
    assetTransfers(limit: $limit, offset: $offset, assetId: $assetId) {
      limit
      offset
      total
      transfers {
        assetHeight
        assetId
        balance
        to
        from
        indexer {
          eventIndex
          extrinsicIndex
          blockHeight
          blockTime
        }
      }
    }
  }
`;

export const ASSET_HOLDERS_LIST = gql`
  query MyQuery($limit: Int!, $offset: Int!, $assetId: Int!) {
    assetHolders(limit: $limit, offset: $offset, assetId: $assetId) {
      holders {
        address
        assetId
        balance
        status
        asset {
          metadata {
            decimals
          }
        }
      }
      total
      limit
      offset
    }
  }
`;

export const ASSET_TIMELINE_LIST = gql`
  query MyQuery($limit: Int!, $offset: Int!, $assetId: Int!) {
    assetTimeline(limit: $limit, offset: $offset, assetId: $assetId) {
      limit
      offset
      total
      items {
        args
        assetHeight
        name
        assetId
        indexer {
          blockTime
          eventIndex
          extrinsicIndex
          blockHeight
        }
      }
    }
  }
`;
