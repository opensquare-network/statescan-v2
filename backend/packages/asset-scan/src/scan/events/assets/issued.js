const { updateAsset } = require("./common/updateAsset");

async function handleIssued(event, indexer) {
  const { data } = event;
  await updateAsset(event, indexer, {
    beneficiary: data[1].toString(),
    amount: data[2].toString(),
  });
}

module.exports = {
  handleIssued,
};
