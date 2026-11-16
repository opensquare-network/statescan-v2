const activity = /* GraphQL */ `
  type ForeignAssetActivityItem {
    assetId: String!
    name: String!
    args: JSONObject
    indexer: Indexer!
  }

  type PagedForeignAssetActivity {
    items: [ForeignAssetActivityItem]!
    offset: Int!
    limit: Int!
    total: Int!
  }
`;

module.exports = {
  activity,
};
