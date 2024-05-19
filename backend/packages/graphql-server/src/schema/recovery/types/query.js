const queries = /* GraphQL */ `
  type Query {
    recoverables(offset: Int!, limit: Int!): PagedRecoverable!
    recoverable(height: Int!, lostAccount: String!): Recoverable
    recoveries(offset: Int!, limit: Int!): PagedRecovery!
    recovery(
      lostAccount: String!
      rescuerAccount: String!
      created: Int!
    ): Recovery
    recoveryScanHeight: Int
  }
`;

module.exports = {
  queries,
};
