const { getLatestSignedTransfers } = require("../../../websocket/store");

async function getLatestTransfers(ctx) {
  ctx.body = getLatestSignedTransfers();
}

module.exports = {
  getLatestTransfers,
};
