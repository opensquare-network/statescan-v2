const { chains } = require("../utils/consts/chains");

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

module.exports = {
  currentChain,
};
