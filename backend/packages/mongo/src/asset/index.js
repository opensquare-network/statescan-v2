const {
  mongo: { ScanDb },
  env: { getEnvOrThrow },
} = require("@osn/scan-common");

let db = null;
let transferCol = null;
let unFinalizedTransferCol = null;
let assetCol = null;
let assetTimelineCol = null;
let assetHolderCol = null;
let assetApprovalCol = null;
let assetDailyStatisticCol = null;

async function initAssetScanDb() {
  db = new ScanDb(
    getEnvOrThrow("MONGO_ASSET_SCAN_URL"),
    getEnvOrThrow("MONGO_ASSET_SCAN_NAME"),
  );
  await db.init();

  transferCol = await db.createCol("transfer");
  unFinalizedTransferCol = await db.createCol("unFinalizedTransfer");
  assetCol = await db.createCol("asset");
  assetTimelineCol = await db.createCol("assetTimeline");
  assetHolderCol = await db.createCol("assetHolder");
  assetApprovalCol = await db.createCol("assetApproval");
  assetDailyStatisticCol = await db.createCol("assetDailyStatistic");
  await _createIndexes();
}

async function _createIndexes() {
  if (!db) {
    console.error("Please call initDb first");
    process.exit(1);
  }

  await transferCol.createIndex({ from: 1 });
  await transferCol.createIndex({ to: 1 });
  await transferCol.createIndex({
    "indexer.blockHeight": -1,
    "indexer.eventIndex": 1,
  });

  await assetCol.createIndex(
    { assetId: 1, assetHeight: 1, module: 1 },
    { unique: true },
  );
  await assetCol.createIndex({ assetId: 1, module: 1 });
  await assetCol.createIndex({ assetId: 1, destroyed: 1, module: 1 });

  await assetTimelineCol.createIndex({
    assetId: 1,
    assetHeight: 1,
    "indexer.blockHeight": -1,
  });

  await assetHolderCol.createIndex({ assetId: 1, assetHeight: 1 });
  await assetHolderCol.createIndex(
    { assetId: 1, assetHeight: 1, address: 1 },
    { unique: true },
  );
  await assetApprovalCol.createIndex(
    { assetId: 1, assetHeight: 1, owner: 1, delegate: 1 },
    { unique: true },
  );
}

async function makeSureInit(col) {
  if (!col) {
    await initAssetScanDb();
  }
}

async function getTransferCollection() {
  await makeSureInit(transferCol);
  return transferCol;
}

async function getUnFinalizedTransferCol() {
  await makeSureInit(unFinalizedTransferCol);
  return unFinalizedTransferCol;
}

async function getAssetCol() {
  await makeSureInit(assetCol);
  return assetCol;
}

async function getAssetTimelineCol() {
  await makeSureInit(assetTimelineCol);
  return assetTimelineCol;
}

async function getAssetHolderCol() {
  await makeSureInit(assetHolderCol);
  return assetHolderCol;
}

async function getAssetApprovalCol() {
  await makeSureInit(assetApprovalCol);
  return assetApprovalCol;
}

async function getAssetDailyStatisticCol() {
  await makeSureInit(assetDailyStatisticCol);
  return assetDailyStatisticCol;
}

function getAssetDb() {
  return db;
}

async function batchInsertTransfers(transfers = []) {
  if (transfers.length <= 0) {
    return;
  }

  const col = await getTransferCollection();
  const bulk = col.initializeUnorderedBulkOp();
  for (const transfer of transfers) {
    bulk.insert(transfer);
  }
  await bulk.execute();
}

module.exports = {
  initAssetScanDb,
  getTransferCollection,
  getUnFinalizedTransferCol,
  getAssetDb,
  batchInsertTransfers,
  getAssetCol,
  getAssetTimelineCol,
  getAssetHolderCol,
  getAssetApprovalCol,
  getAssetDailyStatisticCol,
};
