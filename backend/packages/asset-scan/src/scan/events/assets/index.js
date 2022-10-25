const { handleApprovedTransfer } = require("./approvedTransfer");
const { handleThawed } = require("./thawed");
const { handleFrozen } = require("./frozen");
const { handleTransferred } = require("./transferred");
const { handleDestroyed } = require("./destroyed");
const { handleAssetStatusChanged } = require("./assetStatusChanged");
const { handleMetadataCleared } = require("./metadataCleared");
const { handleBurned } = require("./burned");
const { handleTeamChanged } = require("./teamChanged");
const { handleAssetThawed } = require("./assetThawed");
const { handleAssetFrozen } = require("./assetFrozen");
const { handleIssued } = require("./issued");
const { handleOwnerChanged } = require("./ownerChanged");
const { handleMetadataSet } = require("./metadataSet");
const { handleCreated } = require("./created");
const { AssetsEvents } = require("./consts");

async function handleAssetsEvent(event, indexer, extrinsic) {
  const { section, method } = event;

  if (section !== "assets") {
    // note: this module name maybe different depending on different chain spec.
    return;
  }

  if (method === AssetsEvents.Created) {
    await handleCreated(...arguments, false);
  } else if (method === AssetsEvents.ForceCreated) {
    await handleCreated(...arguments, true);
  } else if (method === AssetsEvents.MetadataSet) {
    await handleMetadataSet(...arguments);
  } else if (method === AssetsEvents.OwnerChanged) {
    await handleOwnerChanged(...arguments);
  } else if (method === AssetsEvents.Issued) {
    await handleIssued(...arguments);
  } else if (method === AssetsEvents.AssetFrozen) {
    await handleAssetFrozen(...arguments);
  } else if (method === AssetsEvents.AssetThawed) {
    await handleAssetThawed(...arguments);
  } else if (method === AssetsEvents.TeamChanged) {
    await handleTeamChanged(...arguments);
  } else if (method === AssetsEvents.Burned) {
    await handleBurned(...arguments);
  } else if (method === AssetsEvents.MetadataCleared) {
    await handleMetadataCleared(...arguments);
  } else if (method === AssetsEvents.AssetStatusChanged) {
    await handleAssetStatusChanged(...arguments);
  } else if (method === AssetsEvents.Destroyed) {
    await handleDestroyed(...arguments);
  } else if (method === AssetsEvents.Transferred) {
    await handleTransferred(...arguments);
  } else if (method === AssetsEvents.Frozen) {
    await handleFrozen(...arguments);
  } else if (method === AssetsEvents.Thawed) {
    await handleThawed(...arguments);
  } else if (method === AssetsEvents.ApprovedTransfer) {
    await handleApprovedTransfer(...arguments);
  }

  // todo: 2. handle asset holders
  // todo: 3. handle asset approvals
}

module.exports = {
  handleAssetsEvent,
};
