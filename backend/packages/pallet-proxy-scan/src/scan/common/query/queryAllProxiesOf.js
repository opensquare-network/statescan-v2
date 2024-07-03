const {
  chain: { findBlockApi },
} = require("@osn/scan-common");

function normalizeDefinition(definition) {
  if (Array.isArray(definition) && definition.length === 2) {
    const [delegate, proxyType] = definition;
    return { delegate, proxyType, delay: 0 };
  } else {
    return definition;
  }
}

async function queryAllProxiesOf(delegator, blockHash) {
  if (!delegator) {
    throw new Error("No delegator argument when query proxies of a delegator");
  }

  const blockApi = await findBlockApi(blockHash);
  const storage = await blockApi.query.proxy.proxies(delegator);
  const [proxyDefinitions, deposit] = storage.toJSON();
  if (!Array.isArray(proxyDefinitions)) {
    throw new Error(`Unknown proxies storage type at blockHash ${blockHash}`);
  }

  return {
    proxies: proxyDefinitions.map(normalizeDefinition),
    deposit,
  };
}

async function findProxy(real, delegate, forceProxyType, indexer) {
  const { proxies } = await queryAllProxiesOf(real, indexer.blockHash);
  return proxies.find((p) => {
    if (forceProxyType) {
      return p.delegate === delegate && p.proxyType === forceProxyType;
    } else {
      return p.delegate === delegate;
    }
  });
}

module.exports = {
  queryAllProxiesOf,
  findProxy,
};
