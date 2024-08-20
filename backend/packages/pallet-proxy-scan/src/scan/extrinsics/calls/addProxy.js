const { getProxySection } = require("../../common");
const {
  chain: { findBlockApi },
} = require("@osn/scan-common");
const { generateProxyId } = require("../../common/hash");
const {
  palletProxy: { upsertProxyIfNo, getProxyTimelineCol, isPureProxyDelegator },
} = require("@statescan/mongo");
const {
  store: { setKnownHeightMark },
} = require("@statescan/common");

const addProxyMethod = "addProxy";

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
