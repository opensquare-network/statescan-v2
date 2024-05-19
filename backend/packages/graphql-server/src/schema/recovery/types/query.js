const queries = /* GraphQL */ `
  type Query {
    recoverables(offset: Int!, limit: Int!): PagedRecoverable!
    recoverable(height: Int!, lostAccount: String!): Recoverable
    recoverableTimeline(
      recoverableHeight: Int!
      lostAccount: String!
      offset: Int!
      limit: Int!
    ): PagedRecoverableTimeline!
    recoveries(offset: Int!, limit: Int!): PagedRecovery!
    recovery(
      lostAccount: String!
      rescuerAccount: String!
      created: Int!
    ): Recovery
    recoveryTimeline(
      lostAccount: String!
      rescuerAccount: String!
      created: Int!
      offset: Int!
      limit: Int!
    ): PagedRecoveryTimeline!
    recoveryScanHeight: Int
  }
`;

module.exports = {
  queries,
};
