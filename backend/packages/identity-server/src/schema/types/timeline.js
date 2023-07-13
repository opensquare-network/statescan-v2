const timelineItem = /* GraphQL */ `
  type TimelineItem {
    account: String!
    name: String!
    args: JSONObject
    indexer: Indexer!
  }
`;

module.exports = {
  timelineItem,
};
