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
      sortField: ValidatorSortField
      sortDirection: SortDirection
    ): PagedStakingValidators!
  }
`;

module.exports = {
  queries,
};
