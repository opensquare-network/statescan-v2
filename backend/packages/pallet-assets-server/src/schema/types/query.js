const queries = /* GraphQL */ `
  type Query {
    assets(
      offset: Int!
      limit: Int!
      sort: AssetSort
      destroyed: Boolean
    ): PagedAsset!
    asset(id: Int!, height: Int): Asset
    assetTransfers(
      offset: Int!
      limit: Int!
      assetId: Int
      assetHeight: Int
      from: String
      to: String
      address: String
    ): PagedTransfer!
    assetHolders(
      offset: Int!
      limit: Int!
      assetId: Int!
      assetHeight: Int
    ): PagedHolder!
    accountAssets(offset: Int!, limit: Int!, address: String!): PagedHolder!
    assetTimeline(
      offset: Int!
      limit: Int!
      assetId: Int!
      assetHeight: Int
    ): PagedTimeline!
    assetStatistic(assetId: Int!, assetHeight: Int): Statistics!
    assetHistoryStatistics(
      assetId: Int!
      assetHeight: Int
      from: Int
      to: Int
    ): [StatisticsWithIndexer]!
    assetsPalletScanHeight: Int
  }
`;

module.exports = {
  queries,
};
