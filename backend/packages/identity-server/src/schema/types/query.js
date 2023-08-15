const queries = /* GraphQL */ `
  type Query {
    identity(account: String!): Identity
    identities(offset: Int!, limit: Int!): PagedIdentities!
    identityTimeline(account: String!): [TimelineItem]!
    registrars: [Registrar]!
    registrarTimeline(account: String!): [TimelineItem]!
    requests(
      registrarIndex: Int
      account: String
      offset: Int!
      limit: Int!
    ): PagedRequests!
    scanHeight: Int
  }
`;

module.exports = {
  queries,
};
