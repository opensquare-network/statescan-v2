const { recoverable } = require("./recoverable");
const { recovery } = require("./recovery");
const { recoveredCall } = require("./recoveredCall");
const { proxy } = require("./proxy");
const { queries } = require("./query");
const { recoveryStatistics } = require("./statistics");

const typeDefs = [
  recoverable,
  recovery,
  recoveredCall,
  proxy,
  queries,
  recoveryStatistics,
];

module.exports = {
  typeDefs,
};
