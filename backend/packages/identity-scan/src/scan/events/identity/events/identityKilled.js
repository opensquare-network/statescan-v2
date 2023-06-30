const { insertIdentityTimeline } = require("../../../mongo");
const { addBlockAccount } = require("../../../../store/account");

async function handleIdentityKilled(event, indexer) {
  const account = event.data[0].toString();
  addBlockAccount(indexer.blockHash, account);

  const slashed = event.data[1].toString();
  await insertIdentityTimeline({
    account,
    indexer,
    name: event.method,
    args: { slashed },
  });
}

module.exports = {
  handleIdentityKilled,
};
