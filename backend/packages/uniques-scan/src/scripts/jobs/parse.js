require("dotenv").config();

const { oneMinute } = require("./common");
const { parseDefinition } = require("../../ipfs/metadata/definition");
const {
  uniques: { initUniquesScanDb },
} = require("@statescan/mongo");

async function parseMetadata() {
  try {
    await parseDefinition();
  } finally {
    setTimeout(parseMetadata, oneMinute * 3);
  }
}

async function main() {
  // start all the jobs
  await initUniquesScanDb();
  await parseMetadata();
}

main().then(console.log);
