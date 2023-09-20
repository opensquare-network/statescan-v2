const queries = /* GraphQL */ `
  type Query {
    multisigAddress(account: String!): MultisigAddress
    scanHeight: Int
  }
`;

module.exports = {
  queries,
};
