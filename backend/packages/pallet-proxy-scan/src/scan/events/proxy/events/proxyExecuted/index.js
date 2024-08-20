const { findTargetCall } = require("@osn/scan-common/src/extrinsic/call");
const { getProxySection } = require("../../../../common/section");
const { handleProxyAnnouncedCall } = require("./proxyAnnounced");
const { logger } = require("@osn/scan-common/src/logger");

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
    return section === getProxySection() && ["proxyAnnounced"].includes(method);
  });
  if (!targetCall) {
    logger.error(
      `Can not find target call for ProxyExecuted at ${indexer.blockHeight}`,
    );
    // todo: not handle, but may have problems
    return;
  }

  const { method } = targetCall;
  if (method === "proxyAnnounced") {
    await handleProxyAnnouncedCall(event, targetCall, indexer);
  }
}

module.exports = {
  handleProxyExecuted,
};
