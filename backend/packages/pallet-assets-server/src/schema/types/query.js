const queries = /* GraphQL */ `
  type Query {
    assets(
      offset: Int!
      limit: Int!
      sort: AssetSort
      destroyed: Boolean
    ): PagedAsset!
    asset(id: Int!, height: Int): Asset
    scanHeight: Int
  }
`;

module.exports = {
  queries,
};
