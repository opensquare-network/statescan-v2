const {
  graphql: { indexer },
} = require("@statescan/common");
const { foreignAsset } = require("./asset");
const { transfer } = require("./transfer");
const { holder } = require("./holder");
const { timeline } = require("./timeline");
const { activity } = require("./activity");
const { queries } = require("./query");

const typeDefs = [
  indexer,
  foreignAsset,
  transfer,
  holder,
  timeline,
  activity,
  queries,
];

module.exports = {
  typeDefs,
};
