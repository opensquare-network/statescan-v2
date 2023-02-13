import litentry from "./litentry";
import statemine from "./statemine";
import statemint from "./statemint";
import westmint from "./westmint";
import litmus from "./litmus";
import westendCollectives from "./westendCollectives";
import collectives from "./collectives";

const chains = {
  // polkadot,
  litentry,
  litmus,
  statemine,
  statemint,
  westmint,
  "westend-collectives": westendCollectives,
  collectives,
};

export default chains;
