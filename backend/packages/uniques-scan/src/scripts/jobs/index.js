require("dotenv").config();

const {
  populateAndParseMetadata,
  parseNftResource,
  syncParseResult,
} = require("./metadata");
const {
  uniques: { initUniquesScanDb },
} = require("@statescan/mongo");

async function main() {
  // start all the jobs
  await initUniquesScanDb();

  await Promise.all([
    populateAndParseMetadata(),
    parseNftResource(),
    syncParseResult(),
  ]);
}

main().then(console.log);
