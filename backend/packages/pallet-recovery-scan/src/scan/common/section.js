const {
  env: { currentChain },
} = require("@osn/scan-common");

function getRecoverySection() {
  return (
    {
      kusama: "recovery",
    }[currentChain()] || "recovery"
  );
}

module.exports = {
  getRecoverySection,
};
