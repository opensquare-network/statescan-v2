const blockAccountsMap = {};

function addBlockAccount(blockHash, account) {
  if (!blockAccountsMap[blockHash]) {
    blockAccountsMap[blockHash] = [account];
  } else {
    blockAccountsMap[blockHash] = [
      ...new Set([...blockAccountsMap[blockHash], account]),
    ];
  }
}

function getBlockAccounts(blockHash) {
  return blockAccountsMap[blockHash] || [];
}

function clearBlockAccounts(blockHash) {
  delete blockAccountsMap[blockHash];
}

module.exports = {
  addBlockAccount,
  getBlockAccounts,
  clearBlockAccounts,
};
