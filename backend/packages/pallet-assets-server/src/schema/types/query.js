const queries = /* GraphQL */ `
  type Query {
    assets(offset: Int!, limit: Int!): PagedAsset!
  }
`;

module.exports = {
  queries,
};
