const {
  graphql: { indexer },
} = require("@statescan/common");
const { reward } = require("./reward");
const { queries } = require("./query");
const { validators } = require("./validators");

const typeDefs = [indexer, reward, queries, validators];

module.exports = {
  typeDefs,
};
