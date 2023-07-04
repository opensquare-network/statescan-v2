const { indexer } = require("./indexer");
const { hello } = require("./hello");
const { identityTypeDefs } = require("./identity");
const { queries } = require("./query");
const { timelineItem } = require("./timeline");

const typeDefs = [indexer, identityTypeDefs, timelineItem, hello, queries];

module.exports = {
  typeDefs,
};
