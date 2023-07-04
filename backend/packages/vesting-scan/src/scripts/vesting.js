const {
  vesting: { getAccountTimelineCol },
} = require("@statescan/mongo");
const {
  utils: { saveHeightsCommon },
} = require("@statescan/common");

async function saveVestingHeights() {
  const timelineCol = await getAccountTimelineCol();
  console.log("Saving vesting heights...", timelineCol);
  await saveHeightsCommon(timelineCol);
}

module.exports = {
  saveVestingHeights,
};
