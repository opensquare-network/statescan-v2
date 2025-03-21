const {
  graphql: { indexer },
} = require("@statescan/common");
const { foreignAsset } = require("./asset");
const { transfer } = require("./transfer");
const { holder } = require("./holder");
const { queries } = require("./query");

const typeDefs = [indexer, foreignAsset, transfer, holder, queries];

module.exports = {
  typeDefs,
};
