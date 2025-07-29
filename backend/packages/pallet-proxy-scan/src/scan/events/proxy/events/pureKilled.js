const { queryAllProxiesOf } = require("../../../common");
const {
  chain: { getBlockHash },
} = require("@osn/scan-common");
const { generateProxyId } = require("../../../common/hash");
const {
  palletProxy: { markProxyRemoved, getProxyTimelineCol },
} = require("@statescan/mongo");

async function handlePureKilled(event, indexer) {
  const pure = event.data[0].toString(); // delegator

  const preBlockHeight = indexer.blockHeight - 1;
  const preBlockHash = await getBlockHash(preBlockHeight);
  const { proxies: preBlockProxies } = await queryAllProxiesOf(
    pure,
    preBlockHash,
  );
  const { proxies: nowProxies } = await queryAllProxiesOf(
    pure,
    indexer.blockHash,
  );
  if (nowProxies.length !== 0) {
    // check this proxy is killed on current height
    return;
  }

  const timelineCol = await getProxyTimelineCol();
  for (const p of preBlockProxies) {
    const { delegate, proxyType, delay } = p;
    const proxyId = generateProxyId(pure, delegate, proxyType, delay);
    await markProxyRemoved(proxyId, indexer);

    await timelineCol.insertOne({
      proxyId,
      name: "Killed",
      args: {},
      indexer,
    });
  }
}

module.exports = {
  handlePureKilled,
};
