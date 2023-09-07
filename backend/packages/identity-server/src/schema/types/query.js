const queries = /* GraphQL */ `
  enum IdentitySubType {
    DIRECT
    SUB
  }

  enum VerificationStatus {
    VERIFIED
    UNVERIFIED
    ERRONEOUS
  }

  type Query {
    identity(account: String!): Identity
    identities(
      offset: Int!
      limit: Int!
      search: String
      identityType: IdentitySubType
      verificationStatus: VerificationStatus
    ): PagedIdentities!
    identityTimeline(account: String!): [TimelineItem]!
    registrars: [Registrar]!
    registrarTimeline(account: String!): [TimelineItem]!
    requests(
      offset: Int!
      limit: Int!
      registrarIndex: Int
      account: String
      sort: RequestSort
      status: RequestStatusValue
    ): PagedRequests!
    scanHeight: Int
    statistics: Statistics!
  }
`;

module.exports = {
  queries,
};
