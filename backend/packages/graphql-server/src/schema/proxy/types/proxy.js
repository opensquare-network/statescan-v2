const proxy = /* GraphQL */ `
  type Proxy {
    proxyId: String!
    delegator: String!
    delegatee: String!
    type: String!
    delay: Int
    isRemoved: Boolean!
    isPure: Boolean!
    disambiguationIndex: Int
    indexer: Indexer!
  }

  type ProxyTimeline {
    proxyId: String!
    name: String
    args: JSONObject
    indexer: Indexer!
  }

  type PagedProxy {
    items: [Proxy]!
    offset: Int!
    limit: Int!
    total: Int!
  }
`;

module.exports = {
  proxy,
};
