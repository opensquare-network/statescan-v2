const { updateAsset } = require("../common/updateAsset");

async function handleApprovalsDestroyed(event, indexer) {
  const approvalsDestroyed = event.data[1].toNumber();
  const approvalsRemaining = event.data[2].toNumber();
  await updateAsset(event, indexer, { approvalsDestroyed, approvalsRemaining });
}

module.exports = {
  handleApprovalsDestroyed,
};
