require("dotenv").config();

const { handleMetadata } = require("../../ipfs/metadata");

async function main() {
  await handleMetadata();
  process.exit(0);
}

main().then(console.log);
