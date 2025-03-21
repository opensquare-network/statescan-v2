const {
  graphql: { indexer },
} = require("@statescan/common");
const { foreignAsset } = require("./asset");
const { transfer } = require("./transfer");
const { queries } = require("./query");

const typeDefs = [indexer, foreignAsset, transfer, queries];

module.exports = {
  typeDefs,
};
