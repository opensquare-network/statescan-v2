const recovery = /* GraphQL */ `
  type Recovery {
    lostAccount: String!
    rescuerAccount: String!
    isClosed: Boolean!
    created: Int!
    deposit: String!
    friends: [String]!
  }

  type PagedRecovery {
    items: [Recovery]!
    offset: Int!
    limit: Int!
    total: Int!
  }

  type RecoveryTimeline {
    lostAccount: String!
    rescuerAccount: String!
    created: Int!
    name: String
    args: JSONObject
    indexer: Indexer!
  }

  type PagedRecoveryTimeline {
    items: [RecoveryTimeline]!
    offset: Int!
    limit: Int!
    total: Int!
  }
`;

module.exports = {
  recovery,
};
