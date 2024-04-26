const {
  env: { currentChain },
} = require("@osn/scan-common");
const { handleCreated } = require("./events");

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

  // todo: mark known height
  if (method === "Created") {
    await handleCreated(event, indexer);
  } else if (method === "ForceCreated") {
  }
}

module.exports = {
  handleAssetsEvent,
};
