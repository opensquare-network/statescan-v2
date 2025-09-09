const reward = /* GraphQL */ `
  type StakingReward {
    who: String!
    dest: JSONObject
    amount: String!
    validator: String
    isValidator: Boolean
    era: Int
    indexer: Indexer!
  }

  type StakingDest {
    stash: String
  }

  type PagedStakingRewards {
    items: [StakingReward!]!
    offset: Int!
    limit: Int!
    total: Int!
  }
`;

module.exports = {
  reward,
};
