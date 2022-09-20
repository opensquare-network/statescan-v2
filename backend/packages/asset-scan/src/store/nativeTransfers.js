// key: blockHash, value: native token transfers
const transfersMap = {};

function addTransfer(blockHash, transfer) {
  if (!transfersMap[blockHash]) {
    transfersMap[blockHash] = [transfer];
  } else {
    transfersMap[blockHash].push(transfer);
  }
}

function addTransfers(blockHash, transfers = []) {
  if (!transfersMap[blockHash]) {
    transfersMap[blockHash] = transfers;
  } else {
    transfersMap[blockHash].push(...transfers);
  }
}

function getBlockTransfers(blockHash) {
  return transfersMap[blockHash] || [];
}

function clearTransfers(blockHash) {
  delete transfersMap[blockHash];
}

module.exports = {
  addNativeTransfer: addTransfer,
  addNativeTransfers: addTransfers,
  getBlockNativeTransfers: getBlockTransfers,
  clearNativeTransfers: clearTransfers,
};
