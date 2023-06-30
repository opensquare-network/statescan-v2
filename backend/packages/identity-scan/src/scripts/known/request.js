const {
  identity: { getRequestCol, getRequestTimelineCol },
} = require("@statescan/mongo");
const {
  utils: { saveHeightsCommon },
} = require("@statescan/common");

async function saveRequestHeights() {
  await saveHeightsCommon(await getRequestTimelineCol());
  await saveHeightsCommon(await getRequestCol());
}

module.exports = {
  saveRequestHeights,
};
