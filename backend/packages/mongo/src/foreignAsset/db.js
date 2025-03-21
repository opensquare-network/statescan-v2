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

  _createIndexes().then(() =>
    console.log("foreign assets scan DB indexes created!"),
  );
}

async function _createIndexes() {
  if (!db) {
    console.error("Please call initDb first");
    process.exit(1);
  }

  await assetCol.createIndex({ assetId: 1 }, { unique: true });
  await assetTimelineCol.createIndex({
    assetId: 1,
    "indexer.blockHeight": -1,
    "indexer.eventIndex": -1,
  });
  await transferCol.createIndex({ assetId: 1 });
  await transferCol.createIndex({
    assetId: 1,
    "indexer.blockHeight": -1,
    "indexer.eventIndex": -1,
  });
  await transferCol.createIndex({ from: 1 });
  await transferCol.createIndex({ to: 1 });
  await transferCol.createIndex({
    "indexer.blockHeight": -1,
    "indexer.eventIndex": 1,
  });

  await holderCol.createIndex({ address: 1 });
  await holderCol.createIndex({ assetId: 1 });
  await holderCol.createIndex({ assetId: 1, address: 1 }, { unique: true });
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
