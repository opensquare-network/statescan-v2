const vesting = /* GraphQL */ `
  type Vesting {
    address: String!
    locked: String!
    perBlock: String!
    startingBlock: Int!
  }

  type PagedVestings {
    vestings: [Vesting]!
    offset: Int!
    limit: Int!
    total: Int!
  }
`;

module.exports = {
  vesting,
};
