const {
  chain: { findBlockApi, getApi },
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

async function findProxyAtBlockHash(real, delegate, forceProxyType, blockHash) {
  const { proxies } = await queryAllProxiesOf(real, blockHash);
  return proxies.find((p) => {
    if (forceProxyType) {
      return p.delegate === delegate && p.proxyType === forceProxyType;
    } else {
      return p.delegate === delegate;
    }
  });
}

async function findProxy(real, delegate, forceProxyType, indexer) {
  return findProxyAtBlockHash(
    real,
    delegate,
    forceProxyType,
    indexer.blockHash,
  );
}

async function findProxyAtHeight(real, delegate, forceProxyType, blockHeight) {
  const api = await getApi();
  const blockHash = await api.rpc.chain.getBlockHash(blockHeight);
  return findProxyAtBlockHash(real, delegate, forceProxyType, blockHash);
}

module.exports = {
  queryAllProxiesOf,
  findProxy,
  findProxyAtBlockHash,
  findProxyAtHeight,
};
