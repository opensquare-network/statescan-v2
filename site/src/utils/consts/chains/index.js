import litentry from "./litentry";
import statemine from "./statemine";
import statemint from "./statemint";
import westmint from "./westmint";
import collectives from "./collectives";
import kusama from "./kusama";
import polkadot from "./polkadot";
import shadow from "./shadow";
import gargantua from "./gargantua";
import polkadotCrustParachain from "./polkadotCrust";
import tangle from "./tangle";
import crust from "./crust";
import invarch from "./invarch";
// import hydradxTestnet from "./hydradxTestnet";
import peopleKusama from "./people-kusama";
import bridgehubPolkadot from "./bridgehub-polkadot";
import bridgehubKusama from "./bridgehub-kusama";
import nexus from "./nexus";

const chains = {
  polkadot,
  "bridgehub-polkadot": bridgehubPolkadot,
  collectives,
  statemint,
  "crust-parachain": polkadotCrustParachain,
  invarch,
  litentry,
  nexus,
  kusama,
  statemine,
  westmint,
  // "hydradx-testnet": hydradxTestnet,
  // polimec,
  shadow,
  gargantua,
  tangle,
  // tinkernet,
  crust,
  "people-kusama": peopleKusama,
  "bridgehub-kusama": bridgehubKusama,
};

export default chains;
