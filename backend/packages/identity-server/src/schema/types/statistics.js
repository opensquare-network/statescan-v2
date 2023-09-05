const identityStatistics = /* GraphQL */ `
  type IdentityStatistics {
    verified: Int!
    unverified: Int!
    erroneous: Int!
  }
`;

const statistics = /* GraphQL */ `
  type Statistics {
    identity: IdentityStatistics!
    subIdentity: Int!
    request: Int!
    judgementGiven: Int!
  }
`;

module.exports = {
  statistics: [identityStatistics, statistics],
};
