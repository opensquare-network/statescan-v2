const { updateAsset } = require("./common/updateAsset");

async function handleAssetStatusChanged(event, indexer) {
  await updateAsset(event, indexer, {});
}

module.exports = {
  handleAssetStatusChanged,
};
