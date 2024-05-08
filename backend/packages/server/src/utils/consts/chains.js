const chains = Object.freeze({
  polkadot: "polkadot",
  kusama: "kusama",
  statemine: "statemine",
  statemint: "statemint",
  westmint: "westmint",
  litentry: "litentry",
  litmus: "litmus",
  "westend-collectives": "westend-collectives",
  collectives: "collectives",
  "hydradx-testnet": "hydradx-testnet",
  polimec: "polimec",
  shadow: "shadow",
  gargantua: "gargantua",
  "polkadot-crust-parachain": "polkadot-crust-parachain",
  tangle: "tangle",
  "tangle-testnet": "tangle-testnet",
  heiko: "heiko",
  parallel: "parallel",
  crust: "crust",
  invarch: "invarch",
  tinkernet: "tinkernet",
});

const ss58Format = Object.freeze({
  [chains.polkadot]: 0,
  [chains.kusama]: 2,
  [chains.statemine]: 2,
  [chains.statemint]: 0,
  [chains.westmint]: 42,
  [chains.litentry]: 31,
  [chains.litmus]: 131,
  [chains.collectives]: 0,
  [chains["westend-collectives"]]: 0,
  [chains["hydradx-testnet"]]: 63,
  [chains.polimec]: 41,
  [chains.shadow]: 66,
  [chains.gargantua]: 42,
  [chains["polkadot-crust-parachain"]]: 88,
  [chains.tangle]: 5845,
  [chains["tangle-testnet"]]: 42,
  [chains.heiko]: 110,
  [chains.parallel]: 172,
  [chains.crust]: 66,
  [chains.invarch]: 117,
  [chains.tinkernet]: 117,
});

function getSs58Format(chain) {
  return ss58Format[chain];
}

const assetsModuleChains = [
  chains.statemint,
  chains.statemine,
  chains.westmint,
  chains.parallel,
];

const uniquesModuleChains = [
  chains.statemint,
  chains.statemine,
  chains.westmint,
];

module.exports = {
  chains,
  assetsModuleChains,
  uniquesModuleChains,
  getSs58Format,
};
