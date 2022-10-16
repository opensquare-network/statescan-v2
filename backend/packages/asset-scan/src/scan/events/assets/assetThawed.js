const { updateAsset } = require("./common/updateAsset");

async function handleAssetThawed(event, indexer) {
  await updateAsset(event, indexer, {});
}

module.exports = {
  handleAssetThawed,
};
