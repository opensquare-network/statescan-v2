const queries = /* GraphQL */ `
  type Query {
    stakingRewards(
      offset: Int!
      limit: Int!
      address: String
    ): PagedStakingRewards!
    stakingValidators(address: String!): StakingValidators!
    stakingScanHeight: Int
  }
`;

module.exports = {
  queries,
};
