const nominations = /* GraphQL */ `
  type ValidatorInfo {
    address: String!
    commission: String
    active: Boolean!
    bonded: String
    bonded_owner: String
    bonded_nominators: String
    nominator_count: Int
  }

  type StakingNominations {
    nominator: String!
    validators: [ValidatorInfo!]!
  }
`;

module.exports = {
  nominations,
};
