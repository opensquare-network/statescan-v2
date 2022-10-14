const { queryAndSetLatestBlockHeight } = require("./latestBlockHeight");

async function startJobs() {
  await queryAndSetLatestBlockHeight();
}

module.exports = {
  startJobs,
};
