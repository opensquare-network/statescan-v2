const {
  graphql: { indexer },
} = require("@statescan/common");
const { reward } = require("./reward");
const { queries } = require("./query");

const typeDefs = [indexer, reward, queries];

module.exports = {
  typeDefs,
};
