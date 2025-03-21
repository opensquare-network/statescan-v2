const {
  graphql: { indexer },
} = require("@statescan/common");
const { foreignAsset } = require("./asset");
const { queries } = require("./query");

const typeDefs = [indexer, foreignAsset, queries];

module.exports = {
  typeDefs,
};
