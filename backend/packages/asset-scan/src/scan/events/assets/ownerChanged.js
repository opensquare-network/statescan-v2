const { updateAsset } = require("./common/updateAsset");

async function handleOwnerChanged(event, indexer) {
  const { data } = event;
  await updateAsset(event, indexer, { owner: data[1].toString });
}

module.exports = {
  handleOwnerChanged,
};
