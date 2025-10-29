const nominations = /* GraphQL */ `
  type ValidatorInfo {
    address: String!
    commission: String
    active: Boolean!
    nominator_stake: String
    self_stake: String
    total_stake: String
    nominator_count: Int
  }

  type StakingNominations {
    validators: [ValidatorInfo!]!
  }
`;

module.exports = {
  nominations,
};
