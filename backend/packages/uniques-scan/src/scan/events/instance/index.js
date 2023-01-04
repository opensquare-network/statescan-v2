const { handleItemPriceRemoved } = require("./itemPriceRemoved");
const { handleItemPriceSet } = require("./itemPriceSet");
const { handleApprovedTransferOrCancelled } = require("./approvedTransfer");
const { handleTransferred } = require("./transferred");
const { handleAttributeSet } = require("./attributeSet");
const { handleAttributeCleared } = require("./attributeCleared");
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
  } else if ("AttributeSet" === method) {
    await handleAttributeSet(event, indexer);
  } else if ("AttributeCleared" === method) {
    await handleAttributeCleared(event, indexer);
  } else if ("Transferred" === method) {
    await handleTransferred(event, indexer);
  } else if (["ApprovedTransfer", "ApprovalCancelled"].includes(method)) {
    await handleApprovedTransferOrCancelled(event, indexer);
  } else if ("ItemPriceSet" === method) {
    await handleItemPriceSet(event, indexer);
  } else if ("ItemPriceRemoved" === method) {
    await handleItemPriceRemoved(event, indexer);
  }
}

module.exports = {
  handleInstanceEvent,
};
