const { updateAsset } = require("../common/updateAsset");

async function handleDestructionStarted(event, indexer) {
  await updateAsset(event, indexer, {});
  // todo: update asset
}

module.exports = {
  handleDestructionStarted,
};
