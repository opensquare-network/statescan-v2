const {
  chain: { findBlockApi },
} = require("@osn/scan-common");

async function queryAllProxiesOf(delegator, blockHash) {
  if (!delegator) {
    throw new Error("No delegator argument when query proxies of a delegator");
  }

  const blockApi = await findBlockApi(blockHash);
  const storage = await blockApi.query.proxy.proxies(delegator);
  const [proxyDefinitions, deposit] = storage.toJSON();
  return {
    proxies: proxyDefinitions,
    deposit,
  };
}

module.exports = {
  queryAllProxiesOf,
};
