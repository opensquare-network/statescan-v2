const timelineItem = /* GraphQL */ `
  type TimelineItem {
    account: String!
    indexer: Indexer!
    name: String!
    args: JSONObject
  }
`;

module.exports = {
  timelineItem,
};
