const { addBlockAccount } = require("../../../store/blockAccounts");

async function handleVestingCompleted(event, indexer) {
  const account = event.data[0].toString();
  addBlockAccount(indexer.blockHash, account);
}

module.exports = {
  handleVestingCompleted,
};
