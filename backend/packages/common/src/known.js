const {
  knownHeight: { getNextKnownHeights, saveKnownHeights, getKnownHeightDb },
} = require("@statescan/mongo");
const {
  chain: { fetchBlocks },
  utils: { emptyFn, sleep },
  logger,
} = require("@osn/scan-common");
const last = require("lodash.last");
const {
  hasKnownHeightMark,
  clearKnownHeightMark,
} = require("./store/knownHeight");

let count = 0;

async function scanKnownHeights(toScanHeight, handleBlockFn = emptyFn) {
  let heights = await getNextKnownHeights(toScanHeight);
  while (heights.length > 0) {
    const blocks = await fetchBlocks(heights);

    for (const block of blocks) {
      try {
        await handleBlockFn(block);
      } catch (e) {
        await sleep(0);
        logger.error(`Error with known block scan ${block.height}`, e);
      }

      logger.info(`${block.height} known scan finished!`);
    }

    const lastHeight = last(blocks || [])?.height;
    count++;
    if (count % 10 === 0) {
      console.log(`${lastHeight} restart process in case of memory leak`);
      process.exit(0);
    }

    heights = await getNextKnownHeights(lastHeight + 1);
  }
}

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
  scanKnownHeights,
  saveKnownHeight,
};
