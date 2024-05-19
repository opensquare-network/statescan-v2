const recoveredCall = /* GraphQL */ `
  type RecoveredCall {
    recoverableHeight: Int
    lostAccount: String!
    rescuer: String
    call: JSONObject
    callHex: String
    indexer: Indexer!
  }

  type PagedRecoveredCall {
    items: [RecoveredCall]!
    offset: Int!
    limit: Int!
    total: Int!
  }
`;

module.exports = {
  recoveredCall,
};
