const { updateOverview } = require("./overview");
const { queryAndSetLatestBlockHeight } = require("./latestBlockHeight");
const { queryAndSetSpecs } = require("./runtime");

async function startJobs() {
  await updateOverview();
  await queryAndSetLatestBlockHeight();
  await queryAndSetSpecs();
}

module.exports = {
  startJobs,
};
