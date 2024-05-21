// used for common graphql server
const commonQueries = /* GraphQL */ `
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
    identityRegistrars: [Registrar]!
    identityRegistrarTimeline(account: String!): [TimelineItem]!
    identityRequests(
      offset: Int!
      limit: Int!
      search: String
      registrarIndex: Int
      sort: RequestSort
      status: RequestStatusValue
    ): PagedRequests!
    identityScanHeight: Int
    identityStatistics: AllStatistics!
  }
`;

module.exports = {
  commonQueries,
};
