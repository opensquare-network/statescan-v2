require("dotenv").config();

const {
  chain: { getApi, getBlockIndexer },
  env: { currentChain },
  consts: { CHAINS },
} = require("@osn/scan-common");
const {
  palletProxy: { markProxyRemoved, getProxyTimelineCol, getProxyCol },
} = require("@statescan/mongo");

async function queryIndexer() {
  const height = 23780225;
  const api = await getApi();
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const block = await api.rpc.chain.getBlock(blockHash);
  return getBlockIndexer(block.block);
}

(async () => {
  if (CHAINS.KUSAMA !== currentChain()) {
    console.log(`Only available for kusama`);
    process.exit(0);
  }

  const indexer = await queryIndexer();
  const proxyCol = await getProxyCol();
  const timelineCol = await getProxyTimelineCol();

  const proxies = await proxyCol
    .find({ type: "IdentityJudgement", isRemoved: false })
    .toArray();
  for (const proxy of proxies) {
    const { proxyId, delegator, delegatee, type, delay } = proxy;
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

    console.log(
      `Handled with delegator ${delegator} and delegatee ${delegatee}`,
    );
  }

  process.exit(0);
})();
