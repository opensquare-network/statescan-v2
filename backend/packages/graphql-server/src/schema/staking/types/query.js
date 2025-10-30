const queries = /* GraphQL */ `
  type Query {
    stakingRewards(
      offset: Int!
      limit: Int!
      address: String
    ): PagedStakingRewards!
    stakingScanHeight: Int
    stakingValidators(
      offset: Int!
      limit: Int!
      address: String
    ): PagedStakingValidators!
  }
`;

module.exports = {
  queries,
};
