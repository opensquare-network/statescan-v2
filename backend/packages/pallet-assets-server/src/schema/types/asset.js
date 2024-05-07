const asset = /* GraphQL */ `
  scalar JSON
  scalar JSONObject

  type AssetMetadata {
    deposit: String!
    name: String
    symbol: String
    decimals: Int!
    isFrozen: Boolean!
  }

  type AssetDetail {
    owner: String
    issuer: String
    admin: String
    freezer: String
    supply: String
    deposit: String
    minBalance: String
    isSufficient: Boolean
    accounts: Int
    sufficients: Int
    approvals: Int
    status: String
  }

  type Asset {
    assetId: String!
    assetHeight: Int!
    detail: AssetDetail
    metadata: AssetMetadata
    destroyed: Boolean!
  }

  type PagedAsset {
    assets: [Asset]!
    offset: Int!
    limit: Int!
    total: Int!
  }

  enum AssetSort {
    HOLDERS_DESC
    ASSET_ID_ASC
  }
`;

module.exports = {
  asset,
};
