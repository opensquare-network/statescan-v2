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
} = require("./events");
const {
  store: { setKnownHeightMark },
} = require("@statescan/common");

const chainSections = {
  statemint: "assets",
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
  }
}

module.exports = {
  handleAssetsEvent,
};
