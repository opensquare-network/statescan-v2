const recoverable = /* GraphQL */ `
  type Recoverable {
    height: Int!
    who: String!
    isActive: Boolean!
    delayPeriod: Int!
    deposit: String!
    friends: [String]!
    threshold: Int!
    rescuer: String
    removedAt: Indexer
  }

  type PagedRecoverable {
    items: [Recoverable]!
    offset: Int!
    limit: Int!
    total: Int!
  }

  type RecoverableTimeline {
    recoverableHeight: Int!
    who: String!
    name: String!
    args: JSONObject
    indexer: Indexer!
  }

  type PagedRecoverableTimeline {
    items: [RecoverableTimeline]!
    offset: Int!
    limit: Int!
    total: Int!
  }
`;

module.exports = {
  recoverable,
};
