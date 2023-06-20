const { insertIdentityTimeline } = require("../../../mongo");
const { addBlockAccount } = require("../../../../store/account");

async function handleIdentityCleared(event, indexer) {
  const account = event.data[0].toString();
  addBlockAccount(indexer.blockHash, account);

  await insertIdentityTimeline({
    account,
    indexer,
    name: event.method,
    args: {},
  });
}

module.exports = {
  handleIdentityCleared,
};
