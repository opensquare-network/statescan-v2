const validators = /* GraphQL */ `
  type ValidatorInfo {
    address: String!
    commission: String!
    active: Boolean!
    self_stake: String!
    total_stake: String!
    nominator_count: Int!
    identity: String
  }

  type PagedStakingValidators {
    items: [ValidatorInfo!]!
    offset: Int!
    limit: Int!
    total: Int!
  }

  enum ValidatorSortField {
    nominator_count
    total_stake
    self_stake
    commission
  }

  enum SortDirection {
    ASC
    DESC
  }
`;

module.exports = {
  validators,
};
