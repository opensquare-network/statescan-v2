const { normalizeEvmAddress } = require("../../common/evmAddress");

// A revive contract address is an EVM address, the scan keeps it in lower case.
function normalizeContractAddress(address) {
  return normalizeEvmAddress(address);
}

module.exports = {
  normalizeContractAddress,
};
