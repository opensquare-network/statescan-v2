const { handleDestroyed } = require("./destroyed");
const { handleMaxSupplySet } = require("./maxSupplySet");
const { handleRedeposited } = require("./redeposited");
const { handleTeamChanged } = require("./teamChanged");
const { handleOwnerChanged } = require("./ownerChanged");
const { handleStatusChanged } = require("./statusChanged");
const { handleFrozenOrThawed } = require("./frozenOrThawed");
const { handleMetadataCleared } = require("./metadataCleared");
const { handleMetadataSet } = require("./metadataSet");
const { handleAttributeCleared } = require("./attributeCleared");
const { handleAttributeSet } = require("./attributeSet");
const { handleForceCreated } = require("./forceCreated");
const { handleCreated } = require("./created");

async function handleClassEvent(event, indexer, extrinsic, events) {
  const { section, method } = event;
  if ("uniques" !== section) {
    return;
  }

  if ("Created" === method) {
    await handleCreated(event, indexer);
  } else if ("ForceCreated" === method) {
    await handleForceCreated(event, indexer);
  } else if ("AttributeSet" === method) {
    await handleAttributeSet(event, indexer);
  } else if ("AttributeCleared" === method) {
    await handleAttributeCleared(event, indexer);
  } else if (["ClassMetadataSet", "CollectionMetadataSet"].includes(method)) {
    await handleMetadataSet(event, indexer);
  } else if (
    ["ClassMetadataCleared", "CollectionMetadataCleared"].includes(method)
  ) {
    await handleMetadataCleared(event, indexer);
  } else if (
    [
      "ClassFrozen",
      "CollectionFrozen",
      "ClassThawed",
      "CollectionThawed",
    ].includes(method)
  ) {
    await handleFrozenOrThawed(event, indexer);
  } else if (["AssetStatusChanged", "ItemStatusChanged"].includes(method)) {
    await handleStatusChanged(event, indexer);
  } else if ("OwnerChanged" === method) {
    await handleOwnerChanged(event, indexer);
  } else if ("TeamChanged" === method) {
    await handleTeamChanged(event, indexer);
  } else if ("Redeposited" === method) {
    await handleRedeposited(event, indexer);
  } else if ("CollectionMaxSupplySet" === method) {
    await handleMaxSupplySet(event, indexer);
  } else if ("Destroyed" === method) {
    await handleDestroyed(event, indexer);
  }
}

module.exports = {
  handleClassEvent,
};
