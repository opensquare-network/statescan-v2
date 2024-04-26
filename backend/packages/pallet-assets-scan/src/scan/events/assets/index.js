const {
  env: { currentChain },
} = require("@osn/scan-common");
const {
  handleCreated,
  handleForceCreated,
  handleMetadataSet,
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
  }
}

module.exports = {
  handleAssetsEvent,
};
