const { block } = require("./block");
const { extrinsic } = require("./extrinsic");
const { event } = require("./event");
const { account } = require("./account");
const { queries } = require("./query");

const typeDefs = [block, extrinsic, event, account, queries];

module.exports = {
  typeDefs,
};
