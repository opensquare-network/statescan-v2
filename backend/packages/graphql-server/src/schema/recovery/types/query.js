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
    recoverableRecoveries(
      recoverableHeight: Int!
      lostAccount: String!
      offset: Int!
      limit: Int!
    ): PagedRecovery!
    recoverableCalls(
      recoverableHeight: Int!
      lostAccount: String!
      offset: Int!
      limit: Int!
    ): PagedRecoveredCall!
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
    recoveryProxies(offset: Int!, limit: Int!): PagedRecoveryProxy!
    recoveryStatistics: RecoveryStatistics!
    recoveryScanHeight: Int
  }
`;

module.exports = {
  queries,
};
