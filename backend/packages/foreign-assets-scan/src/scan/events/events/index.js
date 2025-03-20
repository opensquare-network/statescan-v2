const { getForeignAssetsSection } = require("../../../consts/section");
const {
  store: { setKnownHeightMark },
} = require("@statescan/common");
const { handleTransferred } = require("./transferred");
const { handleCreated } = require("./created");
const { handleForceCreated } = require("./forceCreated");
const { handleMetadataSet } = require("./metadataSet");

async function handleForeignAssetsEvent(event, indexer) {
  const { section, method } = event;
  if (section !== getForeignAssetsSection()) {
    return;
  }

  setKnownHeightMark(indexer.blockHeight);
  if (method === "Created") {
    await handleCreated(event, indexer);
  } else if (method === "ForceCreated") {
    await handleForceCreated(event, indexer);
  } else if (method === "MetadataSet") {
    await handleMetadataSet(event, indexer);
  } else if (method === "Issued") {
  } else if (method === "Burned") {
  } else if (method === "TeamChanged") {
  } else if (method === "OwnerChanged") {
  } else if (method === "Frozen") {
  } else if (method === "Thawed") {
  } else if (method === "AssetFrozen") {
  } else if (method === "AssetThawed") {
  } else if (method === "Transferred") {
    await handleTransferred(event, indexer);
  } else if (method === "MetadataCleared") {
  } else if (method === "AssetStatusChanged") {
  } else if (method === "AssetMinBalanceChanged") {
  } else if (method === "ApprovedTransfer") {
  } else if (method === "ApprovalCancelled") {
  } else if (method === "TransferredApproved") {
  } else if (method === "Touched") {
  } else if (method === "Blocked") {
  } else if (method === "Destroyed") {
  } else if (method === "DestructionStarted") {
  } else if (method === "AccountsDestroyed") {
  } else if (method === "ApprovalsDestroyed") {
  }
}

module.exports = {
  handleForeignAssetsEvent,
};
