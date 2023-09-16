const {
  mongo: { ScanDb },
  env: { getEnvOrThrow },
} = require("@osn/scan-common");

let db = null;
let multisigCol = null;
let timelineCol = null;

async function initMultisigScanDb() {
  db = new ScanDb(
    getEnvOrThrow("MONGO_MULTISIG_SCAN_URL"),
    getEnvOrThrow("MONGO_MULTISIG_SCAN_NAME"),
  );
  await db.init();

  multisigCol = await db.createCol("multisig");
  timelineCol = await db.createCol("timeline");
  _createIndexes().then(() => console.log("DB indexes created!"));
}

async function _createIndexes() {
  if (!db) {
    console.error("Please call initDb first");
    process.exit(1);
  }

  const multisigCol = await getMultisigCol();
  await multisigCol.createIndex({ depositor: 1 });
}

async function makeSureInit(col) {
  if (!col) {
    await initMultisigScanDb();
  }
}

async function getMultisigCol() {
  await makeSureInit(multisigCol);
  return multisigCol;
}

async function getTimelineCol() {
  await makeSureInit(timelineCol);
  return timelineCol;
}

async function getMultisigDb() {
  if (!db) {
    await initMultisigScanDb();
  }

  return db;
}

module.exports = {
  initMultisigScanDb,
  getMultisigDb,
  getMultisigCol,
  getTimelineCol,
};
