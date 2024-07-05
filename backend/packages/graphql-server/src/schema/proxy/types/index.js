const { proxy } = require("./proxy");
const { queries } = require("./query");

const typeDefs = [proxy, queries];

module.exports = {
  typeDefs,
};
