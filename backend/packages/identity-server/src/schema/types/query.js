const queries = /* GraphQL */ `
  type Query {
    identity(account: String!): Identity
    timeline(account: String!): [TimelineItem]!
  }
`;

module.exports = {
  queries,
};
