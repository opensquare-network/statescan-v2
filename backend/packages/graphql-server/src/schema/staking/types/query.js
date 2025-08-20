const queries = /* GraphQL */ `
  type Query {
    reward(offset: Int!, limit: Int!, address: String): PagedRewards!
    stakingScanHeight: Int
  }
`;

module.exports = {
  queries,
};
