// A revive contract address is an EVM address, the scan keeps it in lower case.
function normalizeContractAddress(address) {
  if (typeof address !== "string" || !/^0x[0-9a-fA-F]{40}$/.test(address)) {
    return null;
  }

  return address.toLowerCase();
}

module.exports = {
  normalizeContractAddress,
};
