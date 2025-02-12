const isNil = require("lodash.isnil");

const chains = Object.freeze({
  polkadot: "polkadot",
  kusama: "kusama",
  paseo: "paseo",
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
  nexus: "nexus",
  "polkadot-crust-parachain": "polkadot-crust-parachain",
  tangle: "tangle",
  "tangle-testnet": "tangle-testnet",
  heiko: "heiko",
  parallel: "parallel",
  crust: "crust",
  invarch: "invarch",
  tinkernet: "tinkernet",
  "people-kusama": "people-kusama",
  "coretime-kusama": "coretime-kusama",
  "people-polkadot": "people-polkadot",
  "coretime-polkadot": "coretime-polkadot",
  "bridgehub-polkadot": "bridgehub-polkadot",
  "bridgehub-kusama": "bridgehub-kusama",
  "bridgehub-westend": "bridgehub-westend",
  laos: "laos",
  stagelight: "stagelight",
});

const ss58Format = Object.freeze({
  [chains.polkadot]: 0,
  [chains.kusama]: 2,
  [chains.paseo]: 0,
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
  [chains.nexus]: 42,
  [chains["polkadot-crust-parachain"]]: 88,
  [chains.tangle]: 5845,
  [chains["tangle-testnet"]]: 42,
  [chains.heiko]: 110,
  [chains.parallel]: 172,
  [chains.crust]: 66,
  [chains.invarch]: 117,
  [chains.tinkernet]: 117,
  [chains.laos]: 42,
  [chains["people-kusama"]]: 2,
  [chains["coretime-kusama"]]: 2,
  [chains["people-polkadot"]]: 0,
  [chains["coretime-polkadot"]]: 0,
  [chains["bridgehub-polkadot"]]: 0,
  [chains["bridgehub-kusama"]]: 2,
  [chains["bridgehub-westend"]]: 42,
  [chains.stagelight]: 42,
});

function getSs58Format(chain) {
  const format = ss58Format[chain];
  if (isNil(format)) {
    throw new Error(`Can not find ss58 format for ${chain}`);
  }
  return format;
}

const assetsModuleChains = [
  chains.statemint,
  chains.statemine,
  chains.westmint,
  chains.parallel,
];

const uniquesModuleChains = [
  // chains.statemint,
  // chains.statemine,
  // chains.westmint,
];

const transferOnBlockChains = [
  // whose native token transfer records are in block-scan DB.
  chains.paseo,
  chains.stagelight,
  chains.tangle,
  chains.polimec,
  chains["people-polkadot"],
  chains["coretime-polkadot"],
  chains["coretime-kusama"],
];

module.exports = {
  chains,
  assetsModuleChains,
  uniquesModuleChains,
  getSs58Format,
  transferOnBlockChains,
};
