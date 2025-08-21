const reward = /* GraphQL */ `
  type Reward {
    who: String!
    dest: JSONObject
    amount: String!
    validator: String
    isValidator: Boolean
    era: Int
    indexer: Indexer!
  }

  type Dest {
    stash: String
  }

  type PagedRewards {
    items: [Reward!]!
    offset: Int!
    limit: Int!
    total: Int!
  }
`;

module.exports = {
  reward,
};
