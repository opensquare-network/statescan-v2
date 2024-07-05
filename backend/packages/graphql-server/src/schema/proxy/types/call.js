const proxyCall = /* GraphQL */ `
  type ProxyCall {
    proxyId: String!
    delegator: String!
    delegatee: String!
    forceProxyType: String!
    proxyType: String!
    delay: Int
    normalizedCall: JSONObject
    callHash: String!
    callHex: String!
    eventData: JSONObject
    indexer: Indexer!
  }

  type PagedProxyCall {
    items: [ProxyCall]!
    offset: Int!
    limit: Int!
    total: Int!
  }
`;

module.exports = {
  proxyCall,
};
