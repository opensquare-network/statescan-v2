const { makeExecutableSchema } = require("@graphql-tools/schema");
const { typeDefs } = require("./types");
const resolverFunctions = require("./resolvers");

const resolvers = {
  Query: {
    ...resolverFunctions,
  },
};

module.exports = {
  resolvers,
  typeDefs,
};
