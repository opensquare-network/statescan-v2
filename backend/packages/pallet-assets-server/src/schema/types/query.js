const queries = /* GraphQL */ `
  type Query {
    assets(offset: Int!, limit: Int!): PagedAsset!
    scanHeight: Int
  }
`;

module.exports = {
  queries,
};
