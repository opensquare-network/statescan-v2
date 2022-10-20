const blockAssetMap = {};

function addAssetId(blockHash, assetId) {
  if (!blockAssetMap[blockHash]) {
    blockAssetMap[blockHash] = [assetId];
  } else {
    blockAssetMap[blockHash] = [
      ...new Set([...blockAssetMap[blockHash], assetId]),
    ];
    blockAssetMap[blockHash].push(assetId);
  }
}

function getAssetIds(blockHash) {
  return blockAssetMap[blockHash] || [];
}

function clearAssetIds(blockHash) {
  delete blockAssetMap[blockHash];
}

module.exports = {
  addAssetId,
  getAssetIds,
  clearAssetIds,
};
