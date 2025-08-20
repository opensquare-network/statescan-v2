const reward = /* GraphQL */ `
  type Reward {
    who: String!
    dest: Dest
    amount: String!
    validator: String
    isValidator: Boolean
    era: Int
    indexer: EventIndexer!
  }

  type Dest {
    stash: String
  }

  type PagedRewards {
    rewards: [Reward!]!
    offset: Int!
    limit: Int!
    total: Int!
  }
`;

module.exports = {
  reward,
};
