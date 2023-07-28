const { indexer } = require("./indexer");
const { identityTypeDefs } = require("./identity");
const { queries } = require("./query");
const { timelineItem } = require("./timeline");
const { registrar } = require("./registrar");
const { request } = require("./request");

const typeDefs = [
  indexer,
  identityTypeDefs,
  timelineItem,
  registrar,
  request,
  queries,
];

module.exports = {
  typeDefs,
};
