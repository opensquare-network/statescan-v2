const { chains } = require("../constants");

const chainEndpointPrefixMap = {
  // Polkadot & Parachains
  [chains.polkadot]: "POLKADOT",
  [chains.statemint]: "STATEMINT",
  [chains.litentry]: "LITENTRY",
  [chains.collectives]: "COLLECTIVES",
  [chains.crustPolkadot]: "CRUST_POLKADOT",
  [chains.invarch]: "INVARCH",
  [chains.parallel]: "PARALLEL",
  [chains.bridgehubPolkadot]: "BRIDGEHUB_POLKADOT",

  // Kusama & Parachains
  [chains.kusama]: "KUSAMA",
  [chains.statemine]: "STATEMINE",
  [chains.litmus]: "LITMUS",
  [chains.shadow]: "SHADOW",
  [chains.heiko]: "HEIKO",
  [chains.tinkernet]: "TINKERNET",
  [chains.bridgehubKusama]: "BRIDGEHUB_KUSAMA",
  [chains.peopleKusama]: "PEOPLE_KUSAMA",

  // Westend Parachains
  [chains.westmint]: "WESTMINT",
  [chains.collectivesWestend]: "COLLECTIVES_WESTEND",

  // Solo chains & Testnet
  [chains.crust]: "CRUST",
  [chains.tangle]: "TANGLE",

  // Rococo Parachains
  [chains.gargantua]: "GARGANTUA",
};

// [chain, endpoints]
const endpoints = Object.values(chains).map((chain) => {
  let chainEndpoints = (
    process.env[`${chainEndpointPrefixMap[chain]}_ENDPOINTS`] || ""
  ).split(";");
  return {
    chain,
    endpoints: chainEndpoints,
  };
});

function getEndpoints() {
  return endpoints;
}

module.exports = {
  getEndpoints,
};
