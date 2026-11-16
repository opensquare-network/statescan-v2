// A revive address is an H160, the revive scan keeps addresses in lower case.
function normalizeEvmAddress(address) {
  if (typeof address !== "string") {
    return null;
  }

  const value = address.toLowerCase();
  return /^0x[0-9a-f]{40}$/.test(value) ? value : null;
}

module.exports = {
  normalizeEvmAddress,
};
