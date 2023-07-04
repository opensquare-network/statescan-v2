const queries = /* GraphQL */ `
  type Query {
    identity(account: String!): Identity
    timeline(account: String!): [TimelineItem]!
    registrars: [Registrar]!
    registrarTimeline(account: String!): [TimelineItem]!
    requests(
      registrarIndex: Int
      account: String
      offset: Int!
      limit: Int!
    ): PagedRequests!
  }
`;

module.exports = {
  queries,
};
