const queries = /* GraphQL */ `
  type Query {
    recoverables(offset: Int!, limit: Int!): PagedRecoverable!
    recoveryScanHeight: Int
  }
`;

module.exports = {
  queries,
};
