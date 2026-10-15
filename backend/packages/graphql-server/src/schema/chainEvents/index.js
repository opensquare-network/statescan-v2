const { typeDefs } = require("./types");
const resolverFunctions = require("./resolvers");

// The events list reads the block scan database, and serves the Event type of the chain
// module, so the schema only adds it where both are available.
const resolvers = {
  Query: {
    ...resolverFunctions,
  },
};

module.exports = {
  resolvers,
  typeDefs,
};
