const {
  chains,
  assetsModuleChains,
  uniquesModuleChains,
} = require("../utils/consts/chains");

let chain = null;

function setChain(targetChain) {
  chain = targetChain;
}

function currentChain() {
  if (chain) {
    return chain;
  }

  if (Object.values(chains).includes(process.env.CHAIN)) {
    setChain(process.env.CHAIN);
    return process.env.CHAIN;
  }

  throw new Error(`Unknown chain ${process.env.CHAIN}`);
}

function isAssetsChain() {
  const chain = currentChain();
  return assetsModuleChains.includes(chain);
}

function isPolimec() {
  const chain = currentChain();
  return chain === chains.polimec;
}

function isUniquesChain() {
  const chain = currentChain();
  return uniquesModuleChains.includes(chain);
}

// The revive business is served from its own database, which only the deployments which
// scan it configure.
function hasRevive() {
  return !!process.env.MONGO_PALLET_REVIVE_SCAN_NAME;
}

module.exports = {
  isPolimec,
  currentChain,
  isAssetsChain,
  isUniquesChain,
  hasRevive,
};
