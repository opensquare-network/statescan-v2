const { getProxySection } = require("../../common");
const {
  store: { setKnownHeightMark },
} = require("@statescan/common");
const { normalizeCall } = require("@osn/scan-common/src/extrinsic/call");
const { findProxy } = require("../../common/query/queryAllProxiesOf");
const { generateProxyId } = require("../../common/hash");
const {
  palletProxy: { getProxyCallCol },
} = require("@statescan/mongo");

async function handleProxyCall(call, signer, extrinsicIndexer) {
  const { section, method } = call;
  if (getProxySection() !== section || !["proxy"].includes(method)) {
    return;
  }

  setKnownHeightMark(extrinsicIndexer.blockHeight);
  const real = call.args[0].toString();
  const forceProxyType = call.args[1].toString();
  const normalizedCall = normalizeCall(call.args[2]);
  const callHex = call.toHex();
  const callHash = call.hash.toHex();
  const delegate = signer;

  const proxy = await findProxy(
    real,
    delegate,
    forceProxyType,
    extrinsicIndexer,
  );
  if (!proxy) {
    return;
  }

  const { proxyType, delay } = proxy;
  const proxyId = generateProxyId(real, delegate, proxyType, delay);

  // todo: check and save the result of this proxy call. Currently we can't because we can't locate events of this call.
  const col = await getProxyCallCol();
  await col.insertOne({
    proxyId,
    real,
    delegate,
    forceProxyType,
    proxyType,
    delay,
    normalizedCall,
    callHash,
    callHex,
    indexer: extrinsicIndexer,
  });
}

module.exports = {
  handleProxyCall,
};
