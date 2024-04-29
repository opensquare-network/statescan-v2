const { updateAsset } = require("../common/updateAsset");

async function handleAccountsDestroyed(event, indexer) {
  const accountsDestroyed = event.data[1].toNumber();
  const accountsRemaining = event.data[2].toNumber();
  await updateAsset(event, indexer, { accountsDestroyed, accountsRemaining });
  // todo: update holders, but currently this is hard to do
}

module.exports = {
  handleAccountsDestroyed,
};
