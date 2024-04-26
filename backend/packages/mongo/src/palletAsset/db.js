const {
  mongo: { ScanDb },
  env: { getEnvOrThrow },
} = require("@osn/scan-common");

let db = null;

let assetCol = null;
let assetTimelineCol = null;

async function initPalletAssetScanDb() {
  db = new ScanDb(
    getEnvOrThrow("MONGO_PALLET_ASSET_SCAN_URL"),
    getEnvOrThrow("MONGO_PALLET_ASSET_SCAN_NAME"),
  );
  await db.init();

  assetCol = await db.createCol("asset");
  assetTimelineCol = await db.createCol("assetTimeline");

  _createIndexes().then(() => console.log("asset scan DB indexes created!"));
}

async function _createIndexes() {
  if (!db) {
    console.error("Please call initDb first");
    process.exit(1);
  }

  await assetCol.createIndex({ assetId: 1, assetHeight: 1 }, { unique: true });
  await assetTimelineCol.createIndex({
    assetId: 1,
    assetHeight: 1,
    "indexer.blockHeight": -1,
  });
}

function getAssetDb() {
  return db;
}

async function makeSureInit(col) {
  if (!col) {
    await initPalletAssetScanDb();
  }
}

async function getAssetCol() {
  await makeSureInit(assetCol);
  return assetCol;
}

async function getAssetTimelineCol() {
  await makeSureInit(assetTimelineCol);
  return assetTimelineCol;
}

module.exports = {
  initPalletAssetScanDb,
  getAssetDb,
  getAssetCol,
  getAssetTimelineCol,
};
