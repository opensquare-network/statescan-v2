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
import peoplePolkadot from "./people-polkadot";
import bridgehubPolkadot from "./bridgehub-polkadot";
import bridgehubKusama from "./bridgehub-kusama";
import nexus from "./nexus";
import laos from "./laos";
import paseo from "./paseo";
import stagelight from "./stagelight";
import polimec from "./polimec";
import coretimePolkadot from "./coretime-polkadot";
import coretimeKusama from "./coretime-kusama";
import coretimePaseo from "./coretime-paseo";
import peoplePaseo from "./people-paseo";

const chains = {
  polkadot,
  statemint,
  "bridgehub-polkadot": bridgehubPolkadot,
  collectives,
  "coretime-polkadot": coretimePolkadot,
  "people-polkadot": peoplePolkadot,
  "crust-parachain": polkadotCrustParachain,
  invarch,
  laos,
  litentry,
  nexus,
  kusama,
  statemine,
  westmint,
  // "hydradx-testnet": hydradxTestnet,
  polimec,
  shadow,
  tangle,
  // tinkernet,
  crust,
  "bridgehub-kusama": bridgehubKusama,
  "coretime-kusama": coretimeKusama,
  "people-kusama": peopleKusama,
  paseo,
  "coretime-paseo": coretimePaseo,
  "people-paseo": peoplePaseo,
  gargantua,
  stagelight,
};

export default chains;
