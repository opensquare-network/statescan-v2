const { updateAsset } = require("./common/updateAsset");

async function handleAssetFrozen(event, indexer) {
  await updateAsset(event, indexer, {});
}

module.exports = {
  handleAssetFrozen,
};
