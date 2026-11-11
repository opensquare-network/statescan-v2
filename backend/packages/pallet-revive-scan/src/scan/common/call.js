const EVM_ADDRESS_LENGTH = 42;

function normalizeHex(value) {
  if (!value) {
    return null;
  }

  return value.toString().toLowerCase();
}

function normalizeAddress(address) {
  const hex = normalizeHex(address);
  if (!hex || hex.length !== EVM_ADDRESS_LENGTH) {
    return null;
  }

  return hex;
}

function normalizeCodeData(data) {
  const hex = normalizeHex(data);
  if (!hex || !hex.startsWith("0x")) {
    return "0x";
  }

  return hex;
}

// The first four bytes of the calldata are the selector of the called method.
function getMethodHash(data) {
  const calldata = normalizeCodeData(data);
  if (calldata.length < 10) {
    return null;
  }

  return calldata.slice(0, 10);
}

module.exports = {
  normalizeAddress,
  normalizeCodeData,
  getMethodHash,
};
