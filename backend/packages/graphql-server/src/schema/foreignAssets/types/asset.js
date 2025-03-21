const foreignAsset = /* GraphQL */ `
  scalar JSON
  scalar JSONObject

  type ForeignAssetMetadata {
    deposit: String!
    name: String
    symbol: String
    decimals: Int!
    isFrozen: Boolean!
  }

  type ForeignAssetDetail {
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

  type ForeignAsset {
    assetId: String!
    location: JSONObject!
    assetHeight: Int!
    detail: ForeignAssetDetail
    metadata: ForeignAssetMetadata
  }

  type PagedForeignAsset {
    assets: [ForeignAsset]!
    offset: Int!
    limit: Int!
    total: Int!
  }

  enum ForeignAssetSort {
    HOLDERS_DESC
    ASSET_ID_ASC
  }
`;

module.exports = {
  foreignAsset,
};
