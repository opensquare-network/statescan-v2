const activity = /* GraphQL */ `
  type Activity {
    assetId: Int!
    assetHeight: Int!
    name: String!
    args: JSONObject
    indexer: Indexer!
  }

  type PagedActivity {
    items: [Activity]!
    offset: Int!
    limit: Int!
    total: Int!
  }
`;

module.exports = {
  activity,
};
