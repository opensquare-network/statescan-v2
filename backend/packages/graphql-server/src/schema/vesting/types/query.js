const queries = /* GraphQL */ `
  type Query {
    vestings(offset: Int!, limit: Int!, address: String): PagedVestings!
  }
`;

module.exports = {
  queries,
};
