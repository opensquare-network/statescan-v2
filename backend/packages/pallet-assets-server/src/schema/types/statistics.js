const statistics = /* GraphQL */ `
  type Statistics {
    assetId: Int!
    assetHeight: Int!
    transferCount: Int!
    holderCount: Int!
    timelineCount: Int!
  }

  type StatisticsWithIndexer {
    assetId: Int!
    assetHeight: Int!
    transferCount: Int!
    transferAmount: String
    holderCount: Int!
    indexer: Indexer!
  }
`;

module.exports = {
  statistics,
};
