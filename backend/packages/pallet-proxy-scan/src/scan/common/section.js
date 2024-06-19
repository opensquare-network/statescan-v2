const {
  env: { currentChain },
} = require("@osn/scan-common");

const defaultSectionName = "proxy";

function getProxySection() {
  return (
    {
      polkadot: defaultSectionName,
    }[currentChain()] || defaultSectionName
  );
}

module.exports = {
  getProxySection,
};
