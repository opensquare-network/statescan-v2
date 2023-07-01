require("dotenv").config();

const {
  utils: { saveHeightsCommon },
} = require("@statescan/common");
const { saveIdentityHeights } = require("./identity");
const { saveRequestHeights } = require("./request");
const {
  identity: { getRegistrarsTimelineCol },
} = require("@statescan/mongo");

(async () => {
  await saveIdentityHeights();
  await saveRequestHeights();
  await saveHeightsCommon(await getRegistrarsTimelineCol());
  process.exit(0);
})();
