const {
  env: { firstScanKnowHeights, getScanStep },
  mongo: {
    known: { getKnownHeightDb },
  },
} = require("@osn/scan-common");
const { fetchPeopleChainBlocks } = require("./fetch");
const { handleBlock } = require("../../block");
const { sleep } = require("@osn/scan-common/src/utils");
const { logger } = require("@osn/scan-common/src/logger");
const last = require("lodash.last");

let count = 0;

async function getNextKnownHeights(beginHeight) {
  const db = await getKnownHeightDb();
  const col = db.collection("peopleChainHeight");

  const step = getScanStep();
  const records = await col
    .find({
      height: { $gte: beginHeight },
    })
    .sort({ height: 1 })
    .limit(step)
    .toArray();

  const heights = (records || []).map((item) => item.height);
  return [...new Set(heights)].sort((a, b) => a - b);
}

async function scanKnownHeightsOfPeople(toScanHeight) {
  if (!firstScanKnowHeights()) {
    return;
  }

  let heights = await getNextKnownHeights(toScanHeight);
  while (heights.length > 0) {
    const blocks = await fetchPeopleChainBlocks(heights);
    for (const block of blocks) {
      try {
        await handleBlock(block);
      } catch (e) {
        await sleep(0);
        logger.error(`Error with block scan ${block.height}`, e);
      }

      logger.info(`People chain ${block.height} finished! - known`);
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
  scanKnownHeightsOfPeople,
};
