const queries = /* GraphQL */ `
  type Query {
    identity(account: String!): Identity
    identities(
      offset: Int!
      limit: Int!
      search: String
      includeSubIdentities: Boolean = true
    ): PagedIdentities!
    identityTimeline(account: String!): [TimelineItem]!
    registrars: [Registrar]!
    registrarTimeline(account: String!): [TimelineItem]!
    requests(
      offset: Int!
      limit: Int!
      registrarIndex: Int
      account: String
    ): PagedRequests!
    scanHeight: Int
  }
`;

module.exports = {
  queries,
};
