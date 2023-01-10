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
  const currentChain = currentChain();
  return assetsModuleChains.includes(currentChain);
}

function isUniquesChain() {
  const currentChain = currentChain();
  return uniquesModuleChains.includes(currentChain);
}

module.exports = {
  currentChain,
  isAssetsChain,
  isUniquesChain,
};
