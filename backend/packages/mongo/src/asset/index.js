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

  // todo: create index for assetTimeline
  // todo: create index for assetApproval
  await assetHolderCol.createIndex(
    { assetId: 1, assetHeight: 1, address: 1 },
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
};
