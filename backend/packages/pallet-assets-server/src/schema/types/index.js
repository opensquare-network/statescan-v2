const {
  graphql: { indexer },
} = require("@statescan/common");
const { asset } = require("./asset");
const { queries } = require("./query");
const { transfer } = require("./transfer");
const { holder } = require("./holder");
const { timeline } = require("./timeline");
const { statistics } = require("./statistics");
const { activity } = require("./activity");

const typeDefs = [
  indexer,
  asset,
  queries,
  transfer,
  holder,
  timeline,
  statistics,
  activity,
];

module.exports = {
  typeDefs,
};
