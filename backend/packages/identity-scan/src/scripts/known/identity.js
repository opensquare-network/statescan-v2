const {
  identity: { getIdentityTimelineCol },
} = require("@statescan/mongo");
const { saveHeights } = require("./save");

async function saveIdentityHeights() {
  const timelineCol = await getIdentityTimelineCol();
  await saveHeights(timelineCol);
}

module.exports = {
  saveIdentityHeights,
};
