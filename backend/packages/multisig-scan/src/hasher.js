const {
  chain: { getApi },
  env: { currentChain },
} = require("@osn/scan-common");
const { keccakAsU8a } = require("@polkadot/util-crypto");

async function maybeSetHasher() {
  if (["nexus", "gargantua"].includes(currentChain())) {
    const api = await getApi();
    await api.isReady;
    api.registry.setHasher(keccakAsU8a);
  }
}

module.exports = {
  maybeSetHasher,
};
