const { logger } = require("@osn/scan-common");
const { getProxySection } = require("../../common/section");
const { handleProxyAdded } = require("./events/proxyAdded");
const { handleProxyRemoved } = require("./events/proxyRemoved");
const { handlePureCreated } = require("./events/pureCreated");
const {
  store: { setKnownHeightMark },
} = require("@statescan/common");

async function handleEvent(event, indexer, extrinsic) {
  const { section, method } = event;
  if (section !== getProxySection()) {
    return;
  }
  setKnownHeightMark(indexer.blockHeight);

  if (method === "ProxyAdded") {
    await handleProxyAdded(event, indexer);
  } else if (method === "ProxyRemoved") {
    await handleProxyRemoved(event, indexer);
  } else if (method === "PureCreated") {
    await handlePureCreated(event, indexer, extrinsic);
  }
}

async function handleProxyEvent(event, indexer, extrinsic, blockEvents) {
  try {
    await handleEvent(event, indexer, extrinsic, blockEvents);
  } catch (e) {
    logger.error(
      `Error in handling proxy pallet events at ${indexer.blockHeight}`,
      e,
    );
  }
}

module.exports = {
  handleProxyEvent,
};
