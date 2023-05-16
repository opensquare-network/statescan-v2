require("dotenv").config();

const { getMetadata } = require("../common/queryMetadata");
const {
  runtime: { initRuntimeScanDb, getRuntimeCollection },
} = require("@statescan/mongo");

async function main() {
  await initRuntimeScanDb();

  const col = await getRuntimeCollection();
  const versions = await col.find({}, { projection: { height: 1 } }).toArray();
  console.log(`Got ${versions.length} versions`);
  for (const { height } of versions) {
    const metadata = await getMetadata(height);
    await col.updateOne({ height }, { $set: { metadata } });
    console.log(`version on ${height} updated!`);
  }
  process.exit(0);
}

main().then(console.log);
