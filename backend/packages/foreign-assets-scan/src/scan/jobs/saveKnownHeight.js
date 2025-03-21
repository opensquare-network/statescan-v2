const {
  store: { hasKnownHeightMark, clearKnownHeightMark },
} = require("@statescan/common");
const {
  knownHeight: { saveKnownHeights, getKnownHeightDb },
} = require("@statescan/mongo");

async function saveKnownHeight(indexer) {
  const height = indexer.blockHeight;
  if (hasKnownHeightMark(height)) {
    await saveKnownHeights([height]);
  }

  const db = await getKnownHeightDb();
  await db.updateScanHeight(height);

  clearKnownHeightMark(height);
}

module.exports = {
  saveKnownHeight,
};
