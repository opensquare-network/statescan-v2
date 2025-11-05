const {
  graphql: { indexer },
} = require("@statescan/common");
const { reward } = require("./reward");
const { queries } = require("./query");
const { nominations } = require("./nominations");
const { validators } = require("./validators");

const typeDefs = [indexer, reward, queries, nominations, validators];

module.exports = {
  typeDefs,
};
