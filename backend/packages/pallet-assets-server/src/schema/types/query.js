const queries = /* GraphQL */ `
  type Query {
    assets(
      offset: Int!
      limit: Int!
      sort: AssetSort
      destroyed: Boolean
    ): PagedAsset!
    asset(id: Int!, height: Int): Asset
    transfers(
      offset: Int!
      limit: Int!
      assetId: Int
      assetHeight: Int
      from: String
      to: String
      address: String
    ): PagedTransfer!
    holders(
      offset: Int!
      limit: Int!
      assetId: Int!
      assetHeight: Int
    ): PagedHolder!
    timeline(
      offset: Int!
      limit: Int!
      assetId: Int!
      assetHeight: Int
    ): PagedHolder!
    statistic(assetId: Int!, assetHeight: Int): Statistics!
    historyStatistics(
      assetId: Int!
      assetHeight: Int
      from: Int
      to: Int
    ): [StatisticsWithIndexer]!
    scanHeight: Int
  }
`;

module.exports = {
  queries,
};
