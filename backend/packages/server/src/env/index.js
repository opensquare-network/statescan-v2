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

function isUniquesChain() {
  const chain = currentChain();
  return uniquesModuleChains.includes(chain);
}

module.exports = {
  currentChain,
  isAssetsChain,
  isUniquesChain,
};
