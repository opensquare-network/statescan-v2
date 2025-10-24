const validators = /* GraphQL */ `
  type ValidatorInfo {
    address: String!
    commission: String
    blocked: Boolean!
    myShare: String
    validatorBonded: String
    totalBonded: String
    nominatorCount: Int
  }

  type StakingValidators {
    nominator: String!
    validators: [ValidatorInfo!]!
  }
`;

module.exports = {
  validators,
};
