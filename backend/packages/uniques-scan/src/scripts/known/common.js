const {
  mongo: {
    known: { saveKnownHeights },
  },
} = require("@osn/scan-common");

async function saveCommon(col) {
  const items = await col.find({}).toArray();
  const heights = items.map((item) => item.indexer.blockHeight);
  const uniqueHeights = [...new Set(heights)];
  await saveKnownHeights(uniqueHeights);
}

module.exports = {
  saveCommon,
};
