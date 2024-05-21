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
    identityRegistrars: [Registrar]!
    registrarTimeline(account: String!): [TimelineItem]!
    identityRegistrarTimeline(account: String!): [TimelineItem]!
    requests(
      offset: Int!
      limit: Int!
      search: String
      registrarIndex: Int
      sort: RequestSort
      status: RequestStatusValue
    ): PagedRequests!
    identityRequests(
      offset: Int!
      limit: Int!
      search: String
      registrarIndex: Int
      sort: RequestSort
      status: RequestStatusValue
    ): PagedRequests!
    scanHeight: Int
    identityScanHeight: Int
    statistics: AllStatistics!
    identityStatistics: AllStatistics!
  }
`;

module.exports = {
  queries,
};
