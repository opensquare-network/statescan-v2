const {
  env: { currentChain },
} = require("@osn/scan-common");

const defaultName = "ethereum";

const chainSections = {
  laos: defaultName,
};

function getEthereumSection() {
  return chainSections[currentChain()] || defaultName;
}

module.exports = {
  getEthereumSection,
};
