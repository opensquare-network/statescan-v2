const blockAccountMap = {};

// we save the accounts whose identity is updated in one block
function addBlockAccount(blockHash, account) {
  if (!blockAccountMap[blockHash]) {
    blockAccountMap[blockHash] = [account];
  } else {
    blockAccountMap[blockHash] = [
      ...new Set([...blockAccountMap[blockHash], account]),
    ];
    blockAccountMap[blockHash].push(account);
  }
}

function getBlockAccounts(blockHash) {
  return blockAccountMap[blockHash] || [];
}

function clearBlockAccounts(blockHash) {
  delete blockAccountMap[blockHash];
}

module.exports = {
  addBlockAccount,
  getBlockAccounts,
  clearBlockAccounts,
};
