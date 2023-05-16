require("dotenv").config();

const { getMetadata } = require("../common/queryMetadata");
const {
  runtime: { initRuntimeScanDb, getRuntimeCollection },
} = require("@statescan/mongo");

async function main() {
  await initRuntimeScanDb();

  const col = await getRuntimeCollection();
  const versions = await col.find({}, { projection: { height: 1 } }).toArray();
  const bulk = col.initializeUnorderedBulkOp();
  for (const { height } of versions) {
    const metadata = await getMetadata(height);
    bulk.find({ height }).upsert().updateOne({ $set: { metadata } });
  }
  await bulk.execute();
  process.exit(0);
}

main().then(console.log);
