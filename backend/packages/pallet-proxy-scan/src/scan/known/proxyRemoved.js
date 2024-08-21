const {
  env: { currentChain },
  consts: { CHAINS },
} = require("@osn/scan-common");
const { generateProxyId } = require("../common/hash");
const {
  palletProxy: { markProxyRemoved, getProxyTimelineCol },
} = require("@statescan/mongo");

function getProxy1() {
  return {
    delegator: "1KvKReVmUiTc2LW2a4qyHsaJJ9eE9LRsywZkMk5hyBeyHgw",
    delegatee: "14TKt6bUNjKJdfYqVDNFBqzDAwmJ7WaQwfUmxmizJHHrr1Gs",
    type: "Any",
    delay: 0,
  };
}

function getProxy2() {
  return {
    delegator: "1KvKReVmUiTc2LW2a4qyHsaJJ9eE9LRsywZkMk5hyBeyHgw",
    delegatee: "14TKt6bUNjKJdfYqVDNFBqzDAwmJ7WaQwfUmxmizJHHrr1Gs",
    type: "UnusedSudoBalances",
    delay: 0,
  };
}

async function handleProxyRemoved(indexer) {
  if (CHAINS.POLKADOT !== currentChain() || indexer.blockHeight !== 19333173) {
    return;
  }

  const timelineCol = await getProxyTimelineCol();
  const proxies = [getProxy1(), getProxy2()];
  for (const proxy of proxies) {
    const { delegator, delegatee, type, delay } = proxy;
    const proxyId = generateProxyId(delegator, delegatee, type, delay);
    await markProxyRemoved(proxyId, indexer);

    await timelineCol.insertOne({
      proxyId,
      name: "ProxyRemoved",
      args: {
        delegator,
        delegatee,
        type,
        delay,
      },
      indexer,
    });
  }
}

module.exports = {
  handleProxyRemoved,
};
