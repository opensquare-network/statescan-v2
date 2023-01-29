require("dotenv").config();

const { oneMinute } = require("./common");
const { parseResource } = require("../../ipfs/metadata/resource");
const {
  uniques: { initUniquesScanDb },
} = require("@statescan/mongo");

async function parseNftResource() {
  try {
    await parseResource();
  } finally {
    setTimeout(parseNftResource, oneMinute * 10);
  }
}

async function main() {
  // start all the jobs
  await initUniquesScanDb();
  await parseNftResource();
}

main().then(console.log);
