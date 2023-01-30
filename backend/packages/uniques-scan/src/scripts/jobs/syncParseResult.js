require("dotenv").config();

const { oneMinute } = require("./common");
const { syncParsedData } = require("../../ipfs/metadata/sync");
const {
  uniques: { initUniquesScanDb },
} = require("@statescan/mongo");

async function syncParseResult() {
  try {
    await syncParsedData();
  } finally {
    setTimeout(syncParseResult, oneMinute);
  }
}

async function main() {
  // start all the jobs
  await initUniquesScanDb();
  await syncParseResult();
}

main().then(console.log);
