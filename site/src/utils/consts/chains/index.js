import litentry from "./litentry";
import statemine from "./statemine";
import statemint from "./statemint";
import westmint from "./westmint";
import litmus from "./litmus";
import westendCollectives from "./westendCollectives";
import collectives from "./collectives";
import kusama from "./kusama";
import polkadot from "./polkadot";
import shadow from "./shadow";
import gargantua from "./gargantua";
import polkadotCrustParachain from "./polkadotCrust";
import tangle from "./tangle";
import parallel from "./parallel";
import heiko from "./heiko";
import crust from "./crust";
import invarch from "./invarch";
import tinkernet from "./tinkernet";
// import hydradxTestnet from "./hydradxTestnet";
import peopleKusama from "./people-kusama";
import bridgehubPolkadot from "./bridgehub-polkadot";
import bridgehubKusama from "./bridgehub-kusama";

const chains = {
  kusama,
  polkadot,
  litentry,
  litmus,
  statemine,
  statemint,
  westmint,
  "westend-collectives": westendCollectives,
  collectives,
  // "hydradx-testnet": hydradxTestnet,
  // polimec,
  shadow,
  gargantua,
  "crust-parachain": polkadotCrustParachain,
  crust,
  invarch,
  parallel,
  heiko,
  tangle,
  tinkernet,
  "people-kusama": peopleKusama,
  "bridgehub-polkadot": bridgehubPolkadot,
  "bridgehub-kusama": bridgehubKusama,
};

export default chains;
