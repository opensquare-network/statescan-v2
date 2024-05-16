const {
  mongo: { ScanDb },
  env: { getEnvOrThrow },
} = require("@osn/scan-common");

let db = null;

let recoverableCol = null;
let recoverableTimelineCol = null;
let statisticCol = null;

async function initPalletRecoveryScanDb() {
  db = new ScanDb(
    getEnvOrThrow("MONGO_PALLET_RECOVERY_SCAN_URL"),
    getEnvOrThrow("MONGO_PALLET_RECOVERY_SCAN_NAME"),
  );
  await db.init();

  recoverableCol = await db.createCol("recoverable");
  recoverableTimelineCol = await db.createCol("recoverableTimeline");
  statisticCol = await db.createCol("statistic");

  _createIndexes().then(() => console.log("recovery scan DB indexes created!"));
}

async function _createIndexes() {
  if (!db) {
    console.error("Please call initDb first to initialize recovery DB");
    process.exit(1);
  }

  await recoverableCol.createIndex({ height: 1, who: 1 }, { unique: true });
}

async function getRecoveryDb() {
  if (!db) {
    await initPalletRecoveryScanDb();
  }

  return db;
}

async function makeSureInit(col) {
  if (!col) {
    await initPalletRecoveryScanDb();
  }
}

async function getRecoverableCol() {
  await makeSureInit(recoverableCol);
  return recoverableCol;
}

async function getRecoverableTimelineCol() {
  await makeSureInit(recoverableTimelineCol);
  return recoverableTimelineCol;
}

async function getStatisticCol() {
  await makeSureInit(statisticCol);
  return statisticCol;
}

module.exports = {
  initPalletRecoveryScanDb,
  getRecoveryDb,
  getRecoverableCol,
  getRecoverableTimelineCol,
  getStatisticCol,
};
