const {
  populateAndParseMetadata,
  parseNftResource,
  syncParseResult,
} = require("./metadata");

async function startJobs() {
  await populateAndParseMetadata();
  await parseNftResource();
  await syncParseResult();
}

module.exports = {
  startJobs,
};
