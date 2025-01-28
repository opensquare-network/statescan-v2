const chainSections = {
  statemint: "assets",
  polimec: "foreignAssets",
};

function getSection() {
  return chainSections[currentChain()] || "assets";
}

module.exports = {
  getAssetsSection: getSection,
};
