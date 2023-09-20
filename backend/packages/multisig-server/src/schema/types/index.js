const { multisigAddress } = require("./address");
const { queries } = require("./query");

const typeDefs = [multisigAddress, queries];

module.exports = {
  typeDefs,
};
