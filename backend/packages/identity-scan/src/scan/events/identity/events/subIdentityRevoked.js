const { handleSubIdentityCommon } = require("./common");

async function handleSubIdentityRevoked(event, indexer) {
  await handleSubIdentityCommon(event, indexer);
}

module.exports = {
  handleSubIdentityRevoked,
};
