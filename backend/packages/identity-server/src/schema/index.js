const { makeExecutableSchema } = require("@graphql-tools/schema");

const typeDefinitions = /* GraphQL */ `
  type Query {
    hello: String!
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello World!",
  },
};

const schema = makeExecutableSchema({
  resolvers: [resolvers],
  typeDefs: [typeDefinitions],
});

module.exports = {
  schema,
};
