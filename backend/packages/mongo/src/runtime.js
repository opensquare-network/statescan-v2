const {
  mongo: { ScanDb },
  env: { getEnvOrThrow },
} = require("@osn/scan-common");

let db = null;
let runtimeCol = null;

async function initRuntimeScanDb() {
  db = new ScanDb(
    getEnvOrThrow("MONGO_RUNTIME_SCAN_URL"),
    getEnvOrThrow("MONGO_RUNTIME_SCAN_NAME"),
  );
  await db.init();

  runtimeCol = await db.createCol("runtime");
  await _createIndexes();
}

async function _createIndexes() {
  if (!db) {
    console.error("Please call initDb first");
    process.exit(1);
  }

  //todo: create indexes
}

async function makeSureInit(col) {
  if (!col) {
    await initRuntimeScanDb();
  }
}

async function getRuntimeCollection() {
  await makeSureInit(runtimeCol);
  return runtimeCol;
}

function getRuntimeDb() {
  return db;
}

async function getLatestRuntimeVersion() {
  const col = await getRuntimeCollection();
  const versions = await col.find({}).sort({ height: -1 }).limit(1).toArray();

  return versions.length <= 0 ? null : versions[0];
}

module.exports = {
  initRuntimeScanDb,
  getRuntimeDb,
  getRuntimeCollection,
  getLatestRuntimeVersion,
};
