// The chains this package indexes, each one with everything that differs between them.
// Chain is the name the rest of the package knows the chain by, e.g. in CHAIN.
const networks = Object.freeze({
  polkadot: {
    chain: "statemint",
    subscanApiHost: "https://assethub-polkadot.api.subscan.io",
    blockscoutApiHost: "https://blockscout.polkadot.io",
    blocksFile: "call-blocks.json",
  },
  kusama: {
    chain: "statemine",
    subscanApiHost: "https://assethub-kusama.api.subscan.io",
    blockscoutApiHost: "https://blockscout-kusama.polkadot.io",
    blocksFile: "call-blocks-kusama.json",
  },
});

const defaultNetwork = "polkadot";

function supportedNetworks() {
  return Object.keys(networks).join(", ");
}

function getNetwork(name) {
  const config = networks[name];
  if (!config) {
    throw new Error(
      `Unknown network ${name}, expected one of ${supportedNetworks()}`,
    );
  }

  return { name, ...config };
}

// The network is named by a script argument, or derived from the CHAIN of the .env so the
// scripts which run from cron without arguments still pick the right one. A chain this
// package does not index is rejected instead of being scanned as one of the two.
function resolveNetwork(name) {
  if (name) {
    return getNetwork(name);
  }

  const chain = process.env.CHAIN;
  if (!chain) {
    return getNetwork(defaultNetwork);
  }

  const nameOfChain = Object.keys(networks).find(
    (network) => networks[network].chain === chain,
  );
  if (!nameOfChain) {
    throw new Error(
      `Chain ${chain} is not supported, only ${supportedNetworks()} have a revive pallet`,
    );
  }

  return getNetwork(nameOfChain);
}

// The node in WS_ENDPOINT reports the chain it serves as its spec name, which is the same
// name the statescan setup gives it in CHAIN. Reading a node of another chain would index
// its blocks into the wrong database.
function checkNodeChain(api, network) {
  const specName = api.runtimeVersion.specName.toString();
  if (specName !== network.chain) {
    throw new Error(
      `The node in WS_ENDPOINT serves ${specName}, not ${network.chain} (${network.name})`,
    );
  }
}

module.exports = {
  networks,
  defaultNetwork,
  supportedNetworks,
  getNetwork,
  resolveNetwork,
  checkNodeChain,
};
