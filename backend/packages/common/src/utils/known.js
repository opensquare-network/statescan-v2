const {
  mongo: {
    known: { saveKnownHeights },
  },
} = require("@osn/scan-common");

async function saveHeightsCommon(col) {
  const items = await col.find({}).toArray();
  const heights = [];
  for (const item of items) {
    if (item.indexer) {
      heights.push(item.indexer.blockHeight);
    }

    if (item.timeline) {
      for (const timelineItem of item.timeline || []) {
        if (timelineItem.indexer) {
          heights.push(timelineItem.indexer.blockHeight);
        }
      }
    }
  }
  const uniqueHeights = [...new Set(heights)];
  await saveKnownHeights(uniqueHeights);
}

module.exports = {
  saveHeightsCommon,
};
