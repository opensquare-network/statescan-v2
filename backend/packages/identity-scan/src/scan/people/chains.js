const {
  env: { currentChain },
} = require("@osn/scan-common");

const relayChainStopHeight = Object.freeze({
  polkadot: 22572436,
  kusama: 23780225,
});

function getIdentityStopHeight() {
  const chain = currentChain();
  return relayChainStopHeight[chain];
}

module.exports = {
  relayChainStopHeight,
  getIdentityStopHeight,
};
