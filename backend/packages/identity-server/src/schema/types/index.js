const { identityTypeDefs } = require("./identity");
const { queries } = require("./query");
const { commonQueries } = require("./commonQuery");
const { timelineItem } = require("./timeline");
const { registrar } = require("./registrar");
const { request } = require("./request");
const { statistics } = require("./statistics");
const {
  graphql: { indexer },
} = require("@statescan/common");

const common = [
  indexer,
  identityTypeDefs,
  timelineItem,
  registrar,
  request,
  statistics,
];

const typeDefs = [...common, queries];
const commonTypeDefs = [...common, commonQueries];

module.exports = {
  typeDefs,
  commonTypeDefs,
};
