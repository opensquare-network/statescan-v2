const queries = /* GraphQL */ `
  type Query {
    rewards(offset: Int!, limit: Int!, address: String): PagedRewards!
    stakingScanHeight: Int
  }
`;

module.exports = {
  queries,
};
