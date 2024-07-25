const { proxy } = require("./proxy");
const { queries } = require("./query");
const { proxyCall } = require("./call");
const { announcement } = require("./announcement");

const typeDefs = [proxy, queries, proxyCall, announcement];

module.exports = {
  typeDefs,
};
