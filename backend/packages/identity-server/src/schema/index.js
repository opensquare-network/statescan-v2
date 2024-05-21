const { makeExecutableSchema } = require("@graphql-tools/schema");
const { typeDefs, commonTypeDefs } = require("./types");
const {
  resolvers: resolverFunctions,
  commonResolvers,
} = require("./resolvers");

const resolvers = {
  Query: {
    ...resolverFunctions,
  },
};

const schema = makeExecutableSchema({
  resolvers: [resolvers],
  typeDefs,
});

module.exports = {
  resolvers,
  commonResolvers: {
    Query: {
      ...commonResolvers,
    },
  },
  typeDefs,
  commonTypeDefs,
  schema,
};
