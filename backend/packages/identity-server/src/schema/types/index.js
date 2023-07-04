const { indexer } = require("./indexer");
const { hello } = require("./hello");
const { identityTypeDefs } = require("./identity");
const { queries } = require("./query");

const typeDefs = [indexer, identityTypeDefs, hello, queries];

module.exports = {
  typeDefs,
};
