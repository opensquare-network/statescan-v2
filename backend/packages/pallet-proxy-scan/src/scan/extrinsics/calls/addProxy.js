const { getProxySection, queryAllProxiesOf } = require("../../common");
const {
  chain: { findBlockApi, getBlockHash },
} = require("@osn/scan-common");
const { generateProxyId } = require("../../common/hash");
const {
  palletProxy: { upsertProxyIfNo, getProxyTimelineCol, isPureProxyDelegator },
} = require("@statescan/mongo");
const {
  store: { setKnownHeightMark },
} = require("@statescan/common");
const { getAllProxyIds } = require("./common/proxyIds");

const addProxyMethod = "addProxy";

async function isNewAdded(delegator, delegatee, type, delay, indexer) {
  const proxyId = generateProxyId(delegator, delegatee, type, delay);

  const { proxies: preBlockProxies } = await queryAllProxiesOf(
    delegator,
    await getBlockHash(indexer.blockHeight - 1),
  );
  const proxyIdsAtPreBlock = getAllProxyIds(delegator, preBlockProxies);

  const { proxies: nowBlockProxies } = await queryAllProxiesOf(
    delegator,
    indexer.blockHash,
  );
  const proxyIdsAtNowBlock = getAllProxyIds(delegator, nowBlockProxies);

  return (
    !proxyIdsAtPreBlock.includes(proxyId) &&
    proxyIdsAtNowBlock.includes(proxyId)
  );
}

async function handleAddProxy(call, signer, extrinsicIndexer) {
  const { section, method } = call;
  if (getProxySection() !== section || addProxyMethod !== method) {
    return;
  }

  setKnownHeightMark(extrinsicIndexer.blockHeight);
  const blockApi = await findBlockApi(extrinsicIndexer.blockHash);
  if (
    blockApi.events.proxy?.ProxyAdded // handle this call only when there is no `ProxyAdded` event
  ) {
    return;
  }

  let delay = 0;
  if (call.args.length === 3) {
    delay = call.args[2].toNumber();
  }

  const delegatee = call.args[0].toString();
  const type = call.args[1].toString();
  const proxyId = generateProxyId(signer, delegatee, type, delay);

  const isAddedByThisBlock = await isNewAdded(
    signer,
    delegatee,
    type,
    delay,
    extrinsicIndexer,
  );
  if (!isAddedByThisBlock) {
    return;
  }

  const isPure = await isPureProxyDelegator(signer);
  await upsertProxyIfNo({
    proxyId,
    delegator: signer,
    delegatee,
    type,
    delay,
    isRemoved: false,
    isPure,
    indexer: extrinsicIndexer,
  });

  const timelineCol = await getProxyTimelineCol();
  await timelineCol.insertOne({
    proxyId,
    name: addProxyMethod,
    args: {
      delegator: signer,
      delegatee,
      type,
    },
    indexer: extrinsicIndexer,
  });
}

module.exports = {
  handleAddProxy,
};
