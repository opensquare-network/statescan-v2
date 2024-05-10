const {
  graphql: { indexer },
} = require("@statescan/common");
const { vesting } = require("./vesting");
const { queries } = require("./query");

const typeDefs = [indexer, vesting, queries];

module.exports = {
  typeDefs,
};
