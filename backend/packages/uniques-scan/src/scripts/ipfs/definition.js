require("dotenv").config();
const { parseDefinition } = require("../../ipfs/metadata/definition");
const {
  uniques: { initUniquesScanDb },
} = require("@statescan/mongo");

async function main() {
  await initUniquesScanDb();
  await parseDefinition();
  process.exit(0);
}

main().then(console.log);
