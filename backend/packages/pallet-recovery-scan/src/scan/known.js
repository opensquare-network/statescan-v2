const {
  knownHeight: { getNextKnownHeights },
} = require("@statescan/mongo");
const {
  chain: { fetchBlocks },
} = require("@osn/scan-common");
const { sleep } = require("@osn/scan-common/src/utils");
const { logger } = require("@osn/scan-common/src/logger");
const last = require("lodash.last");
const { handleBlock } = require("./block");

let count = 0;
async function scanKnownHeights(toScanHeight) {
  let heights = await getNextKnownHeights(toScanHeight);
  while (heights.length > 0) {
    const blocks = await fetchBlocks(heights);

    for (const block of blocks) {
      try {
        await handleBlock(block);
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

module.exports = {
  scanKnownHeights,
};
