const { identityTypeDefs } = require("./identity");
const { queries } = require("./query");
const { timelineItem } = require("./timeline");
const { registrar } = require("./registrar");
const { request } = require("./request");
const { statistics } = require("./statistics");
const {
  graphql: { indexer },
} = require("@statescan/common");

const typeDefs = [
  indexer,
  identityTypeDefs,
  timelineItem,
  registrar,
  request,
  statistics,
  queries,
];

module.exports = {
  typeDefs,
};
