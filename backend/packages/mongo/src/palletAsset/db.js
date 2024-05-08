const {
  mongo: { ScanDb },
  env: { getEnvOrThrow },
} = require("@osn/scan-common");

let db = null;

let assetCol = null;
let assetTimelineCol = null;
let transferCol = null;
let holderCol = null;
let approvalCol = null;
let statisticCol = null;

async function initPalletAssetScanDb() {
  db = new ScanDb(
    getEnvOrThrow("MONGO_PALLET_ASSET_SCAN_URL"),
    getEnvOrThrow("MONGO_PALLET_ASSET_SCAN_NAME"),
  );
  await db.init();

  assetCol = await db.createCol("asset");
  assetTimelineCol = await db.createCol("assetTimeline");
  transferCol = await db.createCol("transfer");
  holderCol = await db.createCol("holder");
  approvalCol = await db.createCol("approval");
  statisticCol = await db.createCol("statistic");

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
    "indexer.eventIndex": -1,
  });

  await transferCol.createIndex({ assetId: 1, assetHeight: 1 });
  await transferCol.createIndex({ from: 1 });
  await transferCol.createIndex({ to: 1 });
  await transferCol.createIndex({
    "indexer.blockHeight": -1,
    "indexer.eventIndex": 1,
  });

  await holderCol.createIndex({ address: 1 });
  await holderCol.createIndex({ assetId: 1, assetHeight: 1 });
  await holderCol.createIndex(
    { assetId: 1, assetHeight: 1, address: 1 },
    { unique: true },
  );

  await approvalCol.createIndex(
    { assetId: 1, assetHeight: 1, owner: 1, delegate: 1 },
    { unique: true },
  );

  await statisticCol.createIndex({
    assetId: 1,
    assetHeight: 1,
    "indexer.blockHeight": 1,
  });
}

async function getAssetDb() {
  if (!db) {
    await initPalletAssetScanDb();
  }

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

async function getTransferCol() {
  await makeSureInit(transferCol);
  return transferCol;
}

async function getHolderCol() {
  await makeSureInit(holderCol);
  return holderCol;
}

async function getApprovalCol() {
  await makeSureInit(approvalCol);
  return approvalCol;
}

async function getStatisticCol() {
  await makeSureInit(statisticCol);
  return statisticCol;
}

module.exports = {
  initPalletAssetScanDb,
  getAssetDb,
  getAssetCol,
  getAssetTimelineCol,
  getTransferCol,
  getHolderCol,
  getApprovalCol,
  getStatisticCol,
};
