const {
  env: { currentChain },
} = require("@osn/scan-common");

const defaultSectionName = "revive";

// The pallet may be named differently on some chains.
const chainSections = {};

function getReviveSection() {
  return chainSections[currentChain()] || defaultSectionName;
}

module.exports = {
  getReviveSection,
};
