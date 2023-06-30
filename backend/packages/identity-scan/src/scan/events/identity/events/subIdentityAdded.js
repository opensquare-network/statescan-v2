const { handleSubIdentityCommon } = require("./common");

async function handleSubIdentityAdded(event, indexer) {
  await handleSubIdentityCommon(event, indexer);
}

module.exports = {
  handleSubIdentityAdded,
};
