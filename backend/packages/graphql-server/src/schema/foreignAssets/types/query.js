const queries = /* GraphQL */ `
  type Query {
    foreignAssets(
      offset: Int!
      limit: Int!
      sort: ForeignAssetSort
    ): PagedForeignAsset!
    foreignAsset(id: String!): ForeignAsset
  }
`;

module.exports = {
  queries,
};
