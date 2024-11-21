const {
  queryUnFinalizedBlocks,
} = require("../../features/unfinalized/controllers/blocks");
const { queryFinalizedBlocks } = require("../../common/queryFinalizedBlocks");
const omit = require("lodash.omit");
const { setLatestBlocks } = require("../../websocket/store");
const { CronJob } = require("cron");
const { every12Secs, timeZone } = require("./common");

function normalizeBlock(block, isFinalized = true) {
  return {
    ...omit(block, ["extrinsicsRoot", "hash", "parentHash", "stateRoot"]),
    isFinalized,
  };
}

async function updateLatestBlocks() {
  const unFinalizedBlocks = await queryUnFinalizedBlocks();
  const finalizedBlocks = await queryFinalizedBlocks(0, 5);
  const latestFinalized = finalizedBlocks[0]?.height;
  const filteredUnFinalizedBlocks = unFinalizedBlocks.filter((b) => {
    if (latestFinalized) {
      return b.height > latestFinalized;
    }
    return false;
  });

  const blocks = [
    ...filteredUnFinalizedBlocks.map((item) => normalizeBlock(item, false)),
    ...finalizedBlocks.map((item) => normalizeBlock(item, true)),
  ].slice(0, 5);

  setLatestBlocks(blocks);
}

function startLatestBlocksUpdateJob() {
  new CronJob(every12Secs, updateLatestBlocks, null, true, timeZone);
}

module.exports = {
  startLatestBlocksUpdateJob,
};
