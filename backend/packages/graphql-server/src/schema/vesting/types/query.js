const queries = /* GraphQL */ `
  type Query {
    vestings(offset: Int!, limit: Int!, address: String): PagedVestings!
    vestingScanHeight: Int
  }
`;

module.exports = {
  queries,
};
