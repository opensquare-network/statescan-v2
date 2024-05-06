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
import tangleTestnet from "./tangleTestnet";
import tangle from "./tangle";
import parallel from "./parallel";
import heiko from "./heiko";
import crust from "./crust";
import invarch from "./invarch";

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
  "polkadot-crust-parachain": polkadotCrustParachain,
  crust,
  tangle,
  "tangle-testnet": tangleTestnet,
  invarch,
  parallel,
  heiko,
};

export default chains;
