const { saveCommon } = require("./common");
const {
  uniques: {
    getInstanceCol,
    getInstanceTimelineCol,
    getInstanceAttributeCol,
    getInstanceTransferCol,
  },
} = require("@statescan/mongo");

async function saveInstanceKnownHeights() {
  await saveCommon(await getInstanceCol());
  await saveCommon(await getInstanceTimelineCol());
  await saveCommon(await getInstanceAttributeCol());
  await saveCommon(await getInstanceTransferCol());
}

module.exports = {
  saveInstanceKnownHeights,
};
