const {
  graphql: { indexer },
} = require("@statescan/common");
const { asset } = require("./asset");
const { queries } = require("./query");
const { transfer } = require("./transfer");
const { holder } = require("./holder");

const typeDefs = [indexer, asset, queries, transfer, holder];

module.exports = {
  typeDefs,
};
