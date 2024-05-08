const { updateAsset } = require("./common/updateAsset");

async function handleAssetMinBalanceChanged(event, indexer) {
  const newMinBalance = event.data[1].toBigInt().toString();
  await updateAsset(event, indexer, { newMinBalance });
}

module.exports = {
  handleAssetMinBalanceChanged,
};
