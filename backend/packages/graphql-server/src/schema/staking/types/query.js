const queries = /* GraphQL */ `
  type Query {
    stakingRewards(
      offset: Int!
      limit: Int!
      address: String
    ): PagedStakingRewards!
    stakingNominations(address: String!): StakingNominations
    stakingScanHeight: Int
    stakingValidators(
      offset: Int!
      limit: Int!
      address: String
      sortField: ValidatorSortField
      sortDirection: SortDirection
      onlyActive: Boolean
      no100Commission: Boolean
      identitySearch: String
      hasIdentityOnly: Boolean
    ): PagedStakingValidators!
  }
`;

module.exports = {
  queries,
};
