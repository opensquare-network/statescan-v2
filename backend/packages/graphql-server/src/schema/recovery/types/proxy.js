const proxy = /* GraphQL */ `
  type RecoveryProxy {
    rescuer: String!
    lost: String!
  }

  type PagedRecoveryProxy {
    items: [RecoveryProxy]!
    offset: Int!
    limit: Int!
    total: Int!
  }
`;

module.exports = {
  proxy,
};
