const proxy = /* GraphQL */ `
  type Proxy {
    rescuer: String!
    lost: String!
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
