const queries = /* GraphQL */ `
  type Query {
    identity(account: String!): Identity
  }
`;

module.exports = {
  queries,
};
