const validators = /* GraphQL */ `
  type ValidatorInfo {
    address: String!
    commission: String!
    active: Boolean!
    self_stake: String!
    total_stake: String!
    nominator_count: Int!
  }

  type StakingValidatorsList {
    items: [ValidatorInfo!]!
    total: Int!
  }

  enum ValidatorSortField {
    NOMINATOR_COUNT
    TOTAL_STAKE
    SELF_STAKE
    COMMISSION
  }

  enum SortDirection {
    ASC
    DESC
  }
`;

module.exports = {
  validators,
};
