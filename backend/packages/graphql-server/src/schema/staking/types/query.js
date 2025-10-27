const queries = /* GraphQL */ `
  type Query {
    stakingRewards(
      offset: Int!
      limit: Int!
      address: String
    ): PagedStakingRewards!
    stakingNominations(address: String!): StakingNominations!
    stakingScanHeight: Int
  }
`;

module.exports = {
  queries,
};
