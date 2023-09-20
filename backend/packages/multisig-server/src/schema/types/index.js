const {
  graphql: { indexer },
} = require("@statescan/common");
const { multisigAddress } = require("./address");
const { state } = require("./state");
const { queries } = require("./query");
const { multisigTypeDefs } = require("./multisig");

const typeDefs = [indexer, multisigAddress, state, multisigTypeDefs, queries];

module.exports = {
  typeDefs,
};
