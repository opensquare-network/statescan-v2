const { getLatestBlocks } = require("../../../websocket/store");

async function getLatestOverviewBlocks(ctx) {
  ctx.body = getLatestBlocks();
}

module.exports = {
  getLatestOverviewBlocks,
};
