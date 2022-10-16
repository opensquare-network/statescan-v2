const { handleCreated } = require("./created");
const { AssetsEvents } = require("./consts");

async function handleAssetsEvent(event, indexer, extrinsic) {
  const { section, method } = event;

  if (section !== "assets") {
    // note: this module name maybe different depending on different chain spec.
    return;
  }

  if (method === AssetsEvents.Created) {
    await handleCreated(...arguments);
  }

  // todo: handle other assets pallet events
}

module.exports = {
  handleAssetsEvent,
};
