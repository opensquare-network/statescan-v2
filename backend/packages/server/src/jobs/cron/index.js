const { startLatestTransfersUpdateJob } = require("./signedTransfers");
const { startLatestBlocksUpdateJob } = require("./latestBlock");

function startCronJobs() {
  startLatestBlocksUpdateJob();
  startLatestTransfersUpdateJob();
}

module.exports = {
  startCronJobs,
};
