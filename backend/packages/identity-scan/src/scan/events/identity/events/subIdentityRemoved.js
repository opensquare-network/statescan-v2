const { handleSubIdentityCommon } = require("./common/sub");

async function handleSubIdentityRemoved(event, indexer) {
  await handleSubIdentityCommon(event, indexer);
}

module.exports = {
  handleSubIdentityRemoved,
};
