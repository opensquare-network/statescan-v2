require("dotenv").config();

const {
  populateAndParseMetadata,
  parseNftResource,
  syncParseResult,
} = require("./metadata");

async function main() {
  // start all the jobs
  await Promise.all([
    populateAndParseMetadata(),
    parseNftResource(),
    syncParseResult(),
  ]);
}

main().then(console.log);
