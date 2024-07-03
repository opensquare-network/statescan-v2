const { getProxySection, queryAllProxiesOf } = require("../../common");
const {
  store: { setKnownHeightMark },
} = require("@statescan/common");
const {
  chain: { findBlockApi, getBlockHash },
} = require("@osn/scan-common");
const {
  palletProxy: { markProxyRemoved, getProxyTimelineCol },
} = require("@statescan/mongo");
const { generateProxyId } = require("../../common/hash");
const { getAllProxyIds } = require("./common/proxyIds");

const removeProxyMethod = "removeProxy";

async function handleRemoveProxy(call, signer, extrinsicIndexer) {
  const { section, method } = call;
  if (getProxySection() !== section || removeProxyMethod !== method) {
    return;
  }

  setKnownHeightMark(extrinsicIndexer.blockHeight);
  const blockApi = await findBlockApi(extrinsicIndexer.blockHash);
  if (
    blockApi.events.proxy?.ProxyRemoved || // handle this call only when there is no `ProxyRemoved` event
    call.args.length !== 2
  ) {
    return;
  }

  const delegatee = call.args[0].toString();
  const type = call.args[1].toString();

  const { proxies: preBlockProxies } = await queryAllProxiesOf(
    signer,
    await getBlockHash(extrinsicIndexer.blockHeight - 1),
  );
  const targetProxy = preBlockProxies.find(
    (p) => p.delegate === delegatee && p.proxyType === type,
  );
  if (!targetProxy) {
    return;
  }

  const proxyId = generateProxyId(signer, delegatee, type, targetProxy.delay);
  const { proxies: nowOnChainProxies } = await queryAllProxiesOf(
    signer,
    extrinsicIndexer.blockHash,
  );
  const nowProxyIds = getAllProxyIds(signer, nowOnChainProxies);
  if (nowProxyIds.includes(proxyId)) {
    return;
  }

  await markProxyRemoved(proxyId, extrinsicIndexer);
  const timelineCol = await getProxyTimelineCol();
  await timelineCol.insertOne({
    proxyId,
    name: removeProxyMethod,
    args: {
      delegator: signer,
      delegatee,
      type,
    },
    indexer: extrinsicIndexer,
  });
}

module.exports = {
  handleRemoveProxy,
};
