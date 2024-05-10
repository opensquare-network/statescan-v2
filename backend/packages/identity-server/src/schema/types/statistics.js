const identityStatistics = /* GraphQL */ `
  type IdentityStatistics {
    verified: Int!
    unverified: Int!
    erroneous: Int!
  }
`;

const allStatistics = /* GraphQL */ `
  type AllStatistics {
    identity: IdentityStatistics!
    subIdentity: Int!
    request: Int!
    judgementGiven: Int!
  }
`;

module.exports = {
  statistics: [identityStatistics, allStatistics],
};
