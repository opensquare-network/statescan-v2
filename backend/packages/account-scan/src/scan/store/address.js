// record the addresses which may change in one scanning block
const addressesMap = {};

function addAddress(height, addr) {
  if (!addressesMap[height]) {
    addressesMap[height] = [addr];
  } else {
    addressesMap[height].push(addr);
  }
}

function addAddresses(height, addrs = []) {
  if (!addressesMap[height]) {
    addressesMap[height] = addrs;
  } else {
    addressesMap[height].push(...addrs);
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
