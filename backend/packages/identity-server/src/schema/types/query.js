const queries = /* GraphQL */ `
  type Query {
    identity(account: String!): Identity
    timeline(account: String!): [TimelineItem]!
    registrars: [Registrar]!
  }
`;

module.exports = {
  queries,
};
