const queries = /* GraphQL */ `
  type Query {
    stakingRewards(
      offset: Int!
      limit: Int!
      address: String
    ): PagedStakingRewards!
    stakingScanHeight: Int
  }
`;

module.exports = {
  queries,
};
