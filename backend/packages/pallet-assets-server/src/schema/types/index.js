const {
  graphql: { indexer },
} = require("@statescan/common");
const { asset } = require("./asset");
const { queries } = require("./query");
const { transfer } = require("./transfer");

const typeDefs = [indexer, asset, queries, transfer];

module.exports = {
  typeDefs,
};
