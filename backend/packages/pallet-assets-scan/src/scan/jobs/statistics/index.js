const { isNewDay, setLastBlockIndexer } = require("./date");
const { createAssetStatistics } = require("./create");
const {
  store: { setKnownHeightMark },
} = require("@statescan/common");

async function tryCreateStatistics(indexer) {
  if (isNewDay(indexer.blockTime)) {
    setKnownHeightMark(indexer.blockHeight);
    await createAssetStatistics();
  }

  setLastBlockIndexer(indexer);
}

module.exports = {
  tryCreateStatistics,
};
