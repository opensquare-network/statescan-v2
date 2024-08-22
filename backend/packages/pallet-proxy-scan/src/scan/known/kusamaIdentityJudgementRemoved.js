const {
  env: { currentChain },
  consts: { CHAINS },
} = require("@osn/scan-common");
const {
  palletProxy: { markProxyRemoved, getProxyTimelineCol, getProxyCol },
} = require("@statescan/mongo");

async function handleKusamaIdentityJudgementRemoved(indexer) {
  if (CHAINS.KUSAMA !== currentChain() || indexer.blockHeight !== 23780225) {
    return;
  }

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
  }
}

module.exports = {
  handleKusamaIdentityJudgementRemoved,
};
