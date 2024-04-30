const {
  graphql: { indexer },
} = require("@statescan/common");
const { asset } = require("./asset");
const { queries } = require("./query");

const typeDefs = [indexer, asset, queries];

module.exports = {
  typeDefs,
};
