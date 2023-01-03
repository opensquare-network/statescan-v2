const { handleMetadataCleared } = require("./metadataCleared");
const { handleMetadataSet } = require("./metadataSet");
const { handleFrozenOrThawed } = require("./frozenOrThawed");
const { handleBurned } = require("./burned");
const { handleIssued } = require("./issued");

async function handleInstanceEvent(event, indexer, extrinsic, events) {
  const { section, method } = event;
  if ("uniques" !== section) {
    return;
  }

  if ("Issued" === method) {
    await handleIssued(event, indexer, events);
  } else if ("Burned" === method) {
    await handleBurned(event, indexer);
  } else if (["Frozen", "Thawed"].includes(method)) {
    await handleFrozenOrThawed(event, indexer);
  } else if ("MetadataSet" === method) {
    await handleMetadataSet(event, indexer);
  } else if ("MetadataCleared" === method) {
    await handleMetadataCleared(event, indexer);
  }
}

module.exports = {
  handleInstanceEvent,
};
