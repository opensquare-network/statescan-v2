const {
  mongo: { ScanDb },
  env: { getEnvOrThrow },
} = require("@osn/scan-common");

let db = null;
let multisigCol = null;
let timelineCol = null;
let addressCol = null;

async function initMultisigScanDb() {
  db = new ScanDb(
    getEnvOrThrow("MONGO_MULTISIG_SCAN_URL"),
    getEnvOrThrow("MONGO_MULTISIG_SCAN_NAME"),
  );
  await db.init();

  addressCol = await db.createCol("address");
  multisigCol = await db.createCol("multisig");
  timelineCol = await db.createCol("timeline");
  _createIndexes().then(() => console.log("DB indexes created!"));
}

async function _createIndexes() {
  if (!db) {
    console.error("Please call initDb first");
    process.exit(1);
  }

  await multisigCol.createIndex({ depositor: 1 });
  await addressCol.createIndex({ address: 1 });
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

async function getAddressCol() {
  await makeSureInit(addressCol);
  return addressCol;
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
  getAddressCol,
};
