// record the addresses which may change in one scanning block
const { isValidPolkadotAddress } = require("../../utils/address");
const addressesMap = {};

function addAddress(height, addr) {
  if (!isValidPolkadotAddress(addr)) {
    return;
  }

  const nowAddrs = addressesMap[height];
  if (!nowAddrs) {
    addressesMap[height] = [addr];
  } else {
    addressesMap[height] = [...new Set([...nowAddrs, addr])];
  }
}

function addAddresses(height, addrs = []) {
  const nowAddrs = addressesMap[height];
  if (!nowAddrs) {
    addressesMap[height] = addrs;
  } else {
    addressesMap[height] = [...new Set([...nowAddrs, ...addrs])];
  }
}

function getAddresses(height) {
  return addressesMap[height] || [];
}

function clearAddresses(height) {
  delete addressesMap[height];
}

module.exports = {
  addAddress,
  addAddresses,
  getAddresses,
  clearAddresses,
};
