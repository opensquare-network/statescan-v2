const {
  asset: { getAssetTimelineCol },
} = require("@statescan/mongo");
const isEmpty = require("lodash.isempty");

async function insertAssetTimeline(timelineObj) {
  if (isEmpty(timelineObj)) {
    return;
  }

  const timelineCol = await getAssetTimelineCol();
  await timelineCol.insertOne(timelineObj);
}

module.exports = {
  insertAssetTimeline,
};
