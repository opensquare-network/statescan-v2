const queries = /* GraphQL */ `
  type Query {
    recoverables(offset: Int!, limit: Int!): PagedRecoverable!
    recoverable(height: Int!, lostAccount: String!): Recoverable
    recoveryScanHeight: Int
  }
`;

module.exports = {
  queries,
};
