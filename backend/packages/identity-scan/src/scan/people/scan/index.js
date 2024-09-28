const { getPeopleChainScanHeight } = require("./height");
const { deleteFrom } = require("../../delete");
const { markScanPeopleChain } = require("../../common");
const {
  subscribePeopleChainHeight,
  getPeopleLatestHeight,
} = require("../api/subHeight");
const {
  env: { getScanStep },
  utils: { sleep },
  logger,
} = require("@osn/scan-common");
const { fetchPeopleChainBlocks } = require("./fetch");
const last = require("lodash.last");
const { handleBlock } = require("../../block");
const { peopleChainName } = require("../../common/consts");
const { scanKnownHeightsOfPeople } = require("./known");

function getScanHeights(startHeight) {
  const maxHeight = getPeopleLatestHeight();
  let targetHeight = maxHeight;

  const heights = [];
  const step = getScanStep();
  if (startHeight + step < maxHeight) {
    targetHeight = startHeight + step;
  }

  for (let i = startHeight; i <= targetHeight; i++) {
    heights.push(i);
  }

  return heights;
}

async function oneStepScan(startHeight) {
  const heights = getScanHeights(startHeight);
  let blocks;
  try {
    blocks = await fetchPeopleChainBlocks(heights);
  } catch (e) {
    const start = heights[0];
    const end = heights[heights.length - 1];
    logger.error(`Blocks from ${start} to ${end} fetch error, exit`, e);
    process.exit(1);
  }
  if ((blocks || []).length <= 0) {
    await sleep(1000);
    return startHeight;
  }

  for (const block of blocks) {
    await handleBlock(block);
  }

  const lastHeight = last(blocks || []).height;
  logger.info(`people ${lastHeight} scan finished!`);
  return lastHeight + 1;
}

async function scanPeopleChain() {
  await subscribePeopleChainHeight();
  let toScanHeight = await getPeopleChainScanHeight();
  await deleteFrom(toScanHeight, peopleChainName);
  markScanPeopleChain();

  await scanKnownHeightsOfPeople();

  while (true) {
    toScanHeight = await oneStepScan(toScanHeight);
    await sleep(1);
  }
}

module.exports = {
  scanPeopleChain,
};
