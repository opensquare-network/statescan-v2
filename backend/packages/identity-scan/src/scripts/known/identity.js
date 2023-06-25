const {
  identity: { getIdentityTimelineCol },
} = require("@statescan/mongo");
const {
  utils: { saveHeightsCommon },
} = require("@statescan/common");

async function saveIdentityHeights() {
  const timelineCol = await getIdentityTimelineCol();
  await saveHeightsCommon(timelineCol);
}

module.exports = {
  saveIdentityHeights,
};
