const { handleProxyRemoved } = require("./proxyRemoved");
const {
  handleKusamaIdentityJudgementRemoved,
} = require("./kusamaIdentityJudgementRemoved");

async function handleKnownBusiness(indexer) {
  await handleProxyRemoved(indexer);
  await handleKusamaIdentityJudgementRemoved(indexer);
}

module.exports = {
  handleKnownBusiness,
};
