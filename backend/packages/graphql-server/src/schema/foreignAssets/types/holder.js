const holder = /* GraphQL */ `
  type ForeignAssetHolderInfo {
    balance: String
    status: String
    reason: JSONObject
    extra: JSONObject
  }

  type ForeignAssetHolder {
    address: String!
    assetId: Int!
    asset: ForeignAsset
    info: ForeignAssetHolderInfo!
  }

  type PagedForeignAssetHolder {
    holders: [ForeignAssetHolder]!
    offset: Int!
    limit: Int!
    total: Int!
  }
`;

module.exports = {
  holder,
};
