const request = /* GraphQL */ `
  type RequestStatus {
    name: String!
    indexer: Indexer!
  }

  type Request {
    account: String!
    registrarIndex: Int!
    registrar: String!
    indexer: Indexer!
    status: RequestStatus!
    isFinal: Boolean!
  }

  type RequestTimeline {
    account: String!
    registrarIndex: Int!
    requestHeight: Int!
    name: String!
    args: JSONObject
    indexer: Indexer!
  }
`;

module.exports = {
  request,
};
