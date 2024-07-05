const { proxy } = require("./proxy");
const { queries } = require("./query");
const { proxyCall } = require("./call");

const typeDefs = [proxy, queries, proxyCall];

module.exports = {
  typeDefs,
};
