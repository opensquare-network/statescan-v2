const queries = /* GraphQL */ `
  type Query {
    assets(
      offset: Int!
      limit: Int!
      sort: AssetSort
      destroyed: Boolean
    ): PagedAsset!
    scanHeight: Int
  }
`;

module.exports = {
  queries,
};
