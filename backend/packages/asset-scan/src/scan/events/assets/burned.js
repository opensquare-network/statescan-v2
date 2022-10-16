const { updateAsset } = require("./common/updateAsset");

async function handleBurned(event, indexer) {
  const { data } = event;
  await updateAsset(event, indexer, {
    owner: data[1].toString(),
    balance: data[2].toString(),
  });
}

module.exports = {
  handleBurned,
};
