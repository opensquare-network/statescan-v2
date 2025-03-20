const {
  env: { currentChain },
} = require("@osn/scan-common");

const chainSections = {};

function getSection() {
  return chainSections[currentChain()] || "foreignAssets";
}

module.exports = {
  getForeignAssetsSection: getSection,
};
