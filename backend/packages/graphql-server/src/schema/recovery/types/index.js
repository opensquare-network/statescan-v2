const { recoverable } = require("./recoverable");
const { recovery } = require("./recovery");
const { recoveredCall } = require("./recoveredCall");
const { proxy } = require("./proxy");
const { queries } = require("./query");

const typeDefs = [recoverable, recovery, recoveredCall, proxy, queries];

module.exports = {
  typeDefs,
};
