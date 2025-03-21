const assetAddressesMap = {};

function addAssetAddresses(blockHash, assetId, addrs = []) {
  if (addrs.length <= 0) {
    return;
  }

  if (!assetAddressesMap[blockHash]) {
    assetAddressesMap[blockHash] = {
      [assetId]: addrs,
    };

    return;
  }

  if (!assetAddressesMap[blockHash][assetId]) {
    assetAddressesMap[blockHash][assetId] = [];
  }

  const addrSet = new Set([...assetAddressesMap[blockHash][assetId], ...addrs]);
  assetAddressesMap[blockHash][assetId] = [...addrSet];
}

function getAssetAddresses(blockHash) {
  return assetAddressesMap[blockHash];
}

function clearAssetAddresses(blockHash) {
  delete assetAddressesMap[blockHash];
}

module.exports = {
  addAssetAddresses,
  getAssetAddresses,
  clearAssetAddresses,
};
