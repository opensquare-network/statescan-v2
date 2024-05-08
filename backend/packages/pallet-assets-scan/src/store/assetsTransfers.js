const assetsTransfersMap = {};

function addTransfer(blockHash, data) {
  assetsTransfersMap[blockHash] = assetsTransfersMap[blockHash] || [];
  assetsTransfersMap[blockHash].push(data);
}

function getTransfers(blockHash) {
  const dataInBlock = assetsTransfersMap[blockHash];
  if (dataInBlock) {
    return dataInBlock;
  }

  return [];
}

function clearTransfers(blockHash) {
  delete assetsTransfersMap[blockHash];
}

module.exports = {
  addAssetsTransfer: addTransfer,
  getAssetsTransfers: getTransfers,
  clearAssetsTransfers: clearTransfers,
};
