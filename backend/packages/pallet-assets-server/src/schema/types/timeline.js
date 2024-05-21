const timeline = /* GraphQL */ `
  type Timeline {
    assetId: Int!
    assetHeight: Int!
    name: String!
    args: JSONObject
    indexer: Indexer!
  }

  type PagedTimeline {
    items: [Timeline]!
    offset: Int!
    limit: Int!
    total: Int!
  }
`;

module.exports = {
  timeline,
};
