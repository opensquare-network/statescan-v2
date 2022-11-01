const { updateOverview } = require("./overview");
const { queryAndSetSpecs } = require("./runtime");

async function startJobs() {
  await updateOverview();
  await queryAndSetSpecs();
}

module.exports = {
  startJobs,
};
