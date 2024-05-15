import { gql } from "@apollo/client";

export const GET_ASSETS_LIST = gql`
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

export const GET_ASSET_DETAIL = gql`
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

export const GET_ASSET_TRANSFERS_LIST = gql`
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

export const GET_ASSET_HOLDERS_LIST = gql`
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

export const GET_ASSET_TIMELINE_LIST = gql`
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

export const GET_ASSET_ANALYTICS = gql`
  query MyQuery($assetId: Int!) {
    assetHistoryStatistics(assetId: $assetId) {
      transferAmount
      transferCount
      holderCount
      indexer {
        blockHeight
        blockTime
      }
    }
  }
`;

export const GET_ASSET_COUNTS = gql`
  query MyQuery($assetId: Int!) {
    assetHolders(assetId: $assetId, limit: 10, offset: 0) {
      total
    }
    assetTimeline(assetId: $assetId, limit: 10, offset: 0) {
      total
    }
    assetTransfers(assetId: $assetId, limit: 10, offset: 0) {
      total
    }
  }
`;
