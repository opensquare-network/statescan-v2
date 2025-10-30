const validators = /* GraphQL */ `
  type ValidatorInfo {
    address: String!
    commission: String!
    active: Boolean!
    self_stake: String!
    total_stake: String!
    nominator_count: Int!
  }

  type PagedStakingValidators {
    items: [ValidatorInfo!]!
    offset: Int!
    limit: Int!
    total: Int!
  }
`;

module.exports = {
  validators,
};
