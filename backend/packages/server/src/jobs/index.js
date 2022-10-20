const { queryAndSetLatestBlockHeight } = require("./latestBlockHeight");
const { queryAndSetSpecs } = require("./runtime");

async function startJobs() {
  await queryAndSetLatestBlockHeight();
  await queryAndSetSpecs();
}

module.exports = {
  startJobs,
};
