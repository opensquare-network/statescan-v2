const { populateAndParseMetadata, parseNftResource } = require("./metadata");

async function startJobs() {
  await populateAndParseMetadata();
  await parseNftResource();
}

module.exports = {
  startJobs,
};
