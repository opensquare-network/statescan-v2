const { updateOverview } = require("./overview");
const { queryAndSetSpecs } = require("./runtime");
const { startCronJobs } = require("./cron");

async function startJobs() {
  await updateOverview();
  await queryAndSetSpecs();
  startCronJobs();
}

module.exports = {
  startJobs,
};
