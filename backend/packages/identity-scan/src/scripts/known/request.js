const {
  identity: { getRequestCol, getRequestTimelineCol },
} = require("@statescan/mongo");
const { saveHeights } = require("./save");

async function saveRequestHeights() {
  await saveHeights(await getRequestTimelineCol());
  await saveHeights(await getRequestCol());
}

module.exports = {
  saveRequestHeights,
};
