const { getProxySection } = require("../../common");
const {
  chain: { findBlockApi },
} = require("@osn/scan-common");
const { generateProxyId } = require("../../common/hash");
const {
  palletProxy: { upsertProxyIfNo, getProxyTimelineCol },
} = require("@statescan/mongo");

const addProxyMethod = "addProxy";

async function handleAddProxy(call, signer, extrinsicIndexer) {
  const { section, method } = call;
  if (getProxySection() !== section || addProxyMethod !== method) {
    return;
  }

  const blockApi = await findBlockApi(extrinsicIndexer.blockHash);
  if (
    blockApi.events.proxy?.ProxyAdded || // handle this call only when there is no `ProxyAdded` event
    call.args.length !== 2
  ) {
    return;
  }

  const delegatee = call.args[0].toString();
  const type = call.args[1].toString();
  const proxyId = generateProxyId(signer, delegatee, type, 0);

  await upsertProxyIfNo({
    proxyId,
    delegator: signer,
    delegatee,
    type,
    delay: 0,
    isRemoved: false,
    isPure: false,
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
