const { typeDefs } = require("./types");
const resolverFunctions = require("./resolvers");
const { BlockHeightOrHash } = require("./resolvers/blockHeightOrHash");

const resolvers = {
  BlockHeightOrHash,
  Query: {
    ...resolverFunctions,
  },
};

module.exports = {
  resolvers,
  typeDefs,
};
