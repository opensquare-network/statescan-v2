const queries = /* GraphQL */ `
  type PagedEvent {
    events: [Event]!
    offset: Int!
    limit: Int!
    total: Int!
  }

  type Query {
    chainEvents(
      section: String!
      method: String
      offset: Int!
      limit: Int!
    ): PagedEvent!
  }
`;

module.exports = {
  queries,
};
