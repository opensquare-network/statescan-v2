require("dotenv").config();

const {
  palletProxy: { getProxyCol },
} = require("@statescan/mongo");
const {
  chain: { getApi },
} = require("@osn/scan-common");
const { generateProxyId } = require("../../scan/common/hash");

// todo: 1. get distinct delegators
// todo: 2. iterate delegators and check
// todo: 3. get all proxy of this delegator

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
  const onchainProxies = await getOnChainProxies(api, delegator);
  const dbIds = dbProxies.map((item) => item.proxyId);
  const onChainIds = onchainProxies.map((item) => {
    const { delegatee, type, delay } = item;
    return generateProxyId(delegator, delegatee, type, delay);
  });

  if (dbIds.length !== onChainIds.length) {
    console.error(`Delegator ${delegator} not match`);
    return false;
  }

  if (dbIds.some((id) => !onChainIds.includes(id))) {
    console.error(`Some id in DB not onchain ${delegator}`);
    return false;
  }

  if (onChainIds.some((id) => !dbIds.includes(id))) {
    console.error(`Some id on chain not in db ${delegator}`);
    return false;
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
    }
  }

  process.exit(0);
})();
