const queries = /* GraphQL */ `
  type Query {
    proxies(
      delegator: String
      delegatee: String
      isPure: Boolean
      isActive: Boolean
      offset: Int!
      limit: Int!
    ): PagedProxy!
    proxy(proxyId: String!): Proxy
  }
`;

module.exports = {
  queries,
};
