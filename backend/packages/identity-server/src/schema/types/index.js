const { indexer } = require("./indexer");
const { hello } = require("./hello");
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
  hello,
  queries,
];

module.exports = {
  typeDefs,
};
