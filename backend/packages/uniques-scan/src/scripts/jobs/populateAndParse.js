require("dotenv").config();

const { oneMinute } = require("./common");
const { parseDefinition } = require("../../ipfs/metadata/definition");
const { populateMetadata } = require("../../ipfs/metadata/populate");
const {
  uniques: { initUniquesScanDb },
} = require("@statescan/mongo");

async function populateAndParseMetadata() {
  try {
    await populateMetadata();
    await parseDefinition();
  } finally {
    setTimeout(populateAndParseMetadata, oneMinute * 3);
  }
}

async function main() {
  // start all the jobs
  await initUniquesScanDb();
  await populateAndParseMetadata();
}

main().then(console.log);
