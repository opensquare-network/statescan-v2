const {
  env: { currentChain },
} = require("@osn/scan-common");
const {
  handleCreated,
  handleForceCreated,
  handleMetadataSet,
  handleOwnerChanged,
  handleIssued,
  handleBurned,
  handleTeamChanged,
  handleFrozen,
  handleThawed,
  handleAssetFrozen,
  handleAssetThawed,
  handleTransferred,
  handleMetadataCleared,
  handleAssetStatusChanged,
  handleAssetMinBalanceChanged,
  handleApprovedTransfer,
  handleApprovalCancelled,
  handleTransferredApproved,
  handleTouched,
  handleBlocked,
  handleDestroyed,
  handleAccountsDestroyed,
  handleDestructionStarted,
  handleApprovalsDestroyed,
} = require("./events");
const {
  store: { setKnownHeightMark },
} = require("@statescan/common");

const chainSections = {
  statemint: "assets",
  polimec: "foreignAssets",
};

function getSection() {
  return chainSections[currentChain()] || "assets";
}

async function handleAssetsEvent(event, indexer, extrinsic) {
  const { section, method } = event;
  if (section !== getSection()) {
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
    await handleIssued(event, indexer);
  } else if (method === "Burned") {
    await handleBurned(event, indexer);
  } else if (method === "TeamChanged") {
    await handleTeamChanged(event, indexer);
  } else if (method === "OwnerChanged") {
    await handleOwnerChanged(event, indexer);
  } else if (method === "Frozen") {
    await handleFrozen(event, indexer);
  } else if (method === "Thawed") {
    await handleThawed(event, indexer);
  } else if (method === "AssetFrozen") {
    await handleAssetFrozen(event, indexer);
  } else if (method === "AssetThawed") {
    await handleAssetThawed(event, indexer);
  } else if (method === "Transferred") {
    await handleTransferred(event, indexer);
  } else if (method === "MetadataCleared") {
    await handleMetadataCleared(event, indexer);
  } else if (method === "AssetStatusChanged") {
    await handleAssetStatusChanged(event, indexer);
  } else if (method === "AssetMinBalanceChanged") {
    await handleAssetMinBalanceChanged(event, indexer);
  } else if (method === "ApprovedTransfer") {
    await handleApprovedTransfer(event, indexer);
  } else if (method === "ApprovalCancelled") {
    await handleApprovalCancelled(event, indexer);
  } else if (method === "TransferredApproved") {
    await handleTransferredApproved(event, indexer);
  } else if (method === "Touched") {
    await handleTouched(event, indexer);
  } else if (method === "Blocked") {
    await handleBlocked(event, indexer);
  } else if (method === "Destroyed") {
    await handleDestroyed(event, indexer);
  } else if (method === "DestructionStarted") {
    await handleDestructionStarted(event, indexer);
  } else if (method === "AccountsDestroyed") {
    await handleAccountsDestroyed(event, indexer);
  } else if (method === "ApprovalsDestroyed") {
    await handleApprovalsDestroyed(event, indexer);
  }
}

module.exports = {
  handleAssetsEvent,
};
