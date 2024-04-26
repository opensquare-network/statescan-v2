const { updateAsset } = require("./common/updateAsset");

async function handleTeamChanged(event, indexer) {
  const { data } = event;
  await updateAsset(event, indexer, {
    issuer: data[1].toString(),
    admin: data[1].toString(),
    freezer: data[2].toString(),
  });
}

module.exports = {
  handleTeamChanged,
};
