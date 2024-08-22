require("dotenv").config();

const {
  palletProxy: { getProxyCol },
} = require("@statescan/mongo");
const {
  chain: { getApi },
} = require("@osn/scan-common");
const { generateProxyId } = require("../../scan/common/hash");

async function getDistinctDelegators() {
  const proxyCol = await getProxyCol();
  return await proxyCol.distinct("delegator");
}

async function getDelegatorProxies(delegator) {
  const proxyCol = await getProxyCol();
  return await proxyCol.find({ delegator, isRemoved: false }).toArray();
}

async function getOnChainProxies(api, delegator) {
  const storage = await api.query.proxy.proxies(delegator);
  const [proxyDefinitions] = storage.toJSON();
  return proxyDefinitions.map((def) => {
    return {
      ...def,
      type: def.proxyType,
    };
  });
}

async function checkDelegatorData(api, delegator) {
  const dbProxies = await getDelegatorProxies(delegator);
  const rawOnchainProxies = await getOnChainProxies(api, delegator);
  const onChainProxies = rawOnchainProxies.map((item) => {
    const { delegate, type, delay } = item;
    return {
      ...item,
      proxyId: generateProxyId(delegator, delegate, type, delay),
    };
  });

  for (const dbProxy of dbProxies) {
    const { proxyId, delegatee, type, delay } = dbProxy;
    const onchainOne = onChainProxies.find((p) => p.proxyId === proxyId);
    if (!onchainOne) {
      console.error(
        `Can not find on chain proxy. Delegator ${delegator} Delegatee ${delegatee} Type ${type} Delay ${delay}`,
      );
      return false;
    }
  }

  for (const chainProxy of onChainProxies) {
    const { proxyId, delegate, type, delay } = chainProxy;
    const dbOne = dbProxies.find((p) => p.proxyId === proxyId);
    if (!dbOne) {
      console.error(
        `Can not find db proxy. Delegator ${delegator} Delegate ${delegate} Type ${type} Delay ${delay}`,
      );
      return false;
    }
  }

  return true;
}

(async () => {
  const api = await getApi();

  const delegators = await getDistinctDelegators();
  for (const delegator of delegators) {
    const match = await checkDelegatorData(api, delegator);
    if (!match) {
      console.log(`Please check delegator ${delegator}`);
      break;
    } else {
      console.log(`Match: delegator ${delegator}`);
    }
  }

  process.exit(0);
})();
