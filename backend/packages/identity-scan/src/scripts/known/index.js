require("dotenv").config();

const { saveIdentityHeights } = require("./identity");
const { saveRequestHeights } = require("./request");
const {
  identity: { getRegistrarsTimelineCol },
} = require("@statescan/mongo");
const {
  env: { currentChain },
  mongo: {
    known: { saveKnownHeights },
  },
} = require("@osn/scan-common");
const { saveHeights } = require("./save");

const knownHeights = Object.freeze({
  polkadot: [22572436],
  kusama: [23780225],
});

(async () => {
  await saveIdentityHeights();
  await saveRequestHeights();
  await saveHeights(await getRegistrarsTimelineCol());

  const known = knownHeights[currentChain()];
  await saveKnownHeights(known);
  process.exit(0);
})();
