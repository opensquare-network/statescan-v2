const { createClassIndexes } = require("./dbIndexes");
const {
  mongo: { ScanDb },
  env: { getEnvOrThrow },
} = require("@osn/scan-common");

let db = null;
let classCol = null;
let classTimelineCol = null;
let classAttributeCol = null;

async function initUniquesScanDb() {
  db = new ScanDb(
    getEnvOrThrow("MONGO_UNIQUES_SCAN_URL"),
    getEnvOrThrow("MONGO_UNIQUES_SCAN_NAME"),
  );
  await db.init();

  classCol = await db.createCol("nftClass");
  classTimelineCol = await db.createCol("classTimeline");
  classAttributeCol = await db.createCol("classAttribute");

  await _createIndexes();
}

async function _createIndexes() {
  if (!db) {
    console.error("Please call initDb first");
    process.exit(1);
  }

  await createClassIndexes(classCol);
  await classTimelineCol.createIndex({ classId: 1, classHeight: 1 });
  await classAttributeCol.createIndex({ classId: 1, classHeight: 1 });
}

async function makeSureInit(col) {
  if (!col) {
    await initUniquesScanDb();
  }
}

async function getClassCol() {
  await makeSureInit(classCol);
  return classCol;
}

async function getClassTimelineCol() {
  await makeSureInit(classTimelineCol);
  return classTimelineCol;
}

async function getClassAttributeCol() {
  await makeSureInit(classAttributeCol);
  return classAttributeCol;
}

module.exports = {
  initUniquesScanDb,
  getClassCol,
  getClassTimelineCol,
  getClassAttributeCol,
};
