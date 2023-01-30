require("dotenv").config();

const { oneMinute } = require("./common");
const { populateMetadata } = require("../../ipfs/metadata/populate");
const {
  uniques: { initUniquesScanDb },
} = require("@statescan/mongo");

async function populate() {
  try {
    await populateMetadata();
  } finally {
    setTimeout(populate, oneMinute * 3);
  }
}

async function main() {
  // start all the jobs
  await initUniquesScanDb();
  await populate();
}

main().then(console.log);
