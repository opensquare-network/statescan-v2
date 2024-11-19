const transfersMap = {};

function addNativeTransfer(blockHash, transfer) {
  if (!transfersMap[blockHash]) {
    transfersMap[blockHash] = [transfer];
  } else {
    transfersMap[blockHash].push(transfer);
  }
}

function getBlockNativeTransfers(blockHash) {
  return transfersMap[blockHash] || [];
}

function clearNativeTransfers(blockHash) {
  delete transfersMap[blockHash];
}

module.exports = {
  addNativeTransfer,
  getBlockNativeTransfers,
  clearNativeTransfers,
};
