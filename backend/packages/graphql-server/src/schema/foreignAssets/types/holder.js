const holder = /* GraphQL */ `
  type ForeignAssetHolder {
    address: String!
    assetId: String!
    asset: ForeignAsset
    balance: String
    status: String
    reason: JSONObject
    extra: JSONObject
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
