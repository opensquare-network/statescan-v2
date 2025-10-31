const {
  graphql: { indexer },
} = require("@statescan/common");
const { reward } = require("./reward");
const { queries } = require("./query");
const { nominations } = require("./nominations");

const typeDefs = [indexer, reward, nominations, queries];

module.exports = {
  typeDefs,
};
