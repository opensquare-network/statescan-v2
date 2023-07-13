const request = /* GraphQL */ `
  type RequestStatus {
    name: String!
    indexer: Indexer!
  }

  type Request {
    account: String!
    registrarIndex: Int!
    registrar: String!
    status: RequestStatus!
    indexer: Indexer!
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

  type PagedRequests {
    requests: [Request]!
    offset: Int!
    limit: Int!
    total: Int!
  }
`;

module.exports = {
  request,
};
