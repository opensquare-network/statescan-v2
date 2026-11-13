const { logger } = require("@osn/scan-common");
const {
  store: { setKnownHeightMark },
} = require("@statescan/common");
const { getReviveSection } = require("../../common/section");
const { handleInstantiated } = require("./events/instantiated");

async function handleEvent(event, indexer, extrinsic) {
  const { section, method } = event;
  if (section !== getReviveSection()) {
    return;
  }

  setKnownHeightMark(indexer.blockHeight);

  if (method === "Instantiated") {
    await handleInstantiated(event, indexer, extrinsic);
  }
}

async function handleReviveEvent(event, indexer, extrinsic) {
  try {
    await handleEvent(event, indexer, extrinsic);
  } catch (e) {
    logger.error(
      `Error in handling revive pallet events at ${indexer.blockHeight}`,
      e,
    );
  }
}

module.exports = {
  handleReviveEvent,
};
