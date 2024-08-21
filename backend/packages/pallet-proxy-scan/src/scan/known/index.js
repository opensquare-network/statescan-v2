const { handleProxyRemoved } = require("./proxyRemoved");

async function handleKnownBusiness(indexer) {
  await handleProxyRemoved(indexer);
}

module.exports = {
  handleKnownBusiness,
};
