const {
  findTargetCall,
  normalizeCall,
} = require("@osn/scan-common/src/extrinsic/call");
const { getProxySection } = require("../../../../common/section");
const {
  findTargetCallAuthor,
} = require("@statescan/common/src/call/findTargetCallAuthor");
const { findProxy } = require("../../../../common/query/queryAllProxiesOf");
const { generateProxyId } = require("../../../../common/hash");
const {
  palletProxy: { getProxyCallCol },
} = require("@statescan/mongo");
const { handleProxyAnnouncedCall } = require("./proxyAnnounced");
const { logger } = require("@osn/scan-common/src/logger");

async function handleProxyCall(delegate, event, call, indexer) {
  const normalizedCall = normalizeCall(call.args[2]);
  const callHex = call.toHex();
  const callHash = call.hash.toHex();
  const eventData = event.data.toJSON();

  const real = call.args[0].toString();
  const forceProxyType = call.args[1].toString();

  const proxy = await findProxy(real, delegate, forceProxyType, indexer);
  if (!proxy) {
    return;
  }

  const { proxyType, delay } = proxy;
  const proxyId = generateProxyId(real, delegate, proxyType, delay);

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
    eventData,
    indexer,
  });
}

async function handleProxyExecuted(event, indexer, extrinsic) {
  if (!extrinsic) {
    logger.error(
      `A ProxyExecuted event without extrinsic at ${indexer.blockHeight}`,
    );
    // todo: maybe executed by scheduler
    return;
  }
  const targetCall = findTargetCall(extrinsic.method, (call) => {
    const { section, method } = call;
    return (
      section === getProxySection() &&
      ["proxy", "proxyAnnounced"].includes(method)
    );
  });
  if (!targetCall) {
    logger.error(
      `Can not find target call for ProxyExecuted at ${indexer.blockHeight}`,
    );
    // todo: not handle, but may have problems
    return;
  }

  const { method } = targetCall;
  if (method === "proxy") {
    const delegate = findTargetCallAuthor(
      extrinsic.method,
      extrinsic.signer.toString(),
      (call) => {
        return call.section === getProxySection() && "proxy" === method;
      },
    );
    await handleProxyCall(delegate, event, targetCall, indexer);
  } else if (method === "proxyAnnounced") {
    await handleProxyAnnouncedCall(event, targetCall, indexer);
  }
}

module.exports = {
  handleProxyExecuted,
};
