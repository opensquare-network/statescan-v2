const {
  mongo: { ScanDb },
  env: { getEnvOrThrow },
} = require("@osn/scan-common");

let db = null;

let assetCol = null;
let assetTimelineCol = null;
let transferCol = null;
let holderCol = null;

async function initForeignAssetScanDb() {
  db = new ScanDb(
    getEnvOrThrow("MONGO_FOREIGN_ASSET_SCAN_URL"),
    getEnvOrThrow("MONGO_FOREIGN_ASSET_SCAN_NAME"),
  );
  await db.init();

  assetCol = await db.createCol("asset");
  assetTimelineCol = await db.createCol("assetTimeline");
  transferCol = await db.createCol("transfer");
  holderCol = await db.createCol("holder");
}

async function _createIndexes() {
  if (!db) {
    console.error("Please call initDb first");
    process.exit(1);
  }
}

async function getForeignAssetDb() {
  if (!db) {
    await initForeignAssetScanDb();
  }

  return db;
}

async function makeSureInit(col) {
  if (!col) {
    await initForeignAssetScanDb();
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

async function getTransferCol() {
  await makeSureInit(transferCol);
  return transferCol;
}

async function getHolderCol() {
  await makeSureInit(holderCol);
  return holderCol;
}

module.exports = {
  initForeignAssetScanDb,
  getForeignAssetDb,
  getAssetCol,
  getAssetTimelineCol,
  getTransferCol,
  getHolderCol,
};
