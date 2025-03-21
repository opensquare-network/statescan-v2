const timeline = /* GraphQL */ `
  type ForeignAssetTimelineItem {
    assetId: String!
    name: String!
    args: JSONObject
    indexer: Indexer!
  }

  type PagedForeignAssetTimeline {
    items: [ForeignAssetTimelineItem]!
    offset: Int!
    limit: Int!
    total: Int!
  }
`;

module.exports = {
  timeline,
};
