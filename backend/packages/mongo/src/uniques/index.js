const { createInstanceIndexes } = require("./dbIndexes");
const { createClassIndexes } = require("./dbIndexes");
const {
  mongo: { ScanDb },
  env: { getEnvOrThrow },
} = require("@osn/scan-common");

let db = null;
let classCol = null;
let classTimelineCol = null;
let classAttributeCol = null;

let instanceCol = null;
let instanceTimelineCol = null;
let instanceAttributeCol = null;
let instanceTransferCol = null;
let resourceCol = null;

async function initUniquesScanDb() {
  db = new ScanDb(
    getEnvOrThrow("MONGO_UNIQUES_SCAN_URL"),
    getEnvOrThrow("MONGO_UNIQUES_SCAN_NAME"),
  );
  await db.init();

  classCol = await db.createCol("nftClass");
  classTimelineCol = await db.createCol("classTimeline");
  classAttributeCol = await db.createCol("classAttribute");

  instanceCol = await db.createCol("nftInstance");
  instanceTimelineCol = await db.createCol("instanceTimeline");
  instanceAttributeCol = await db.createCol("instanceAttribute");
  instanceTransferCol = await db.createCol("instanceTransfer");

  resourceCol = await db.createCol("resource");

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

  await createInstanceIndexes(instanceCol);
  await instanceTimelineCol.createIndex({
    classId: 1,
    classHeight: 1,
    instanceId: 1,
    instanceHeight: 1,
  });
  await instanceAttributeCol.createIndex({
    classId: 1,
    classHeight: 1,
    instanceId: 1,
    instanceHeight: 1,
  });
  await instanceTransferCol.createIndex({
    classId: 1,
    classHeight: 1,
    instanceId: 1,
    instanceHeight: 1,
  });
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

async function getInstanceCol() {
  await makeSureInit(instanceCol);
  return instanceCol;
}

async function getInstanceTimelineCol() {
  await makeSureInit(instanceTimelineCol);
  return instanceTimelineCol;
}

async function getInstanceAttributeCol() {
  await makeSureInit(instanceAttributeCol);
  return instanceAttributeCol;
}

async function getInstanceTransferCol() {
  await makeSureInit(instanceTransferCol);
  return instanceTransferCol;
}

async function getResourceCol() {
  await makeSureInit(resourceCol);
  return resourceCol;
}

function getUniquesDb() {
  return db;
}

module.exports = {
  getUniquesDb,
  initUniquesScanDb,
  getClassCol,
  getClassTimelineCol,
  getClassAttributeCol,

  getInstanceCol,
  getInstanceTimelineCol,
  getInstanceAttributeCol,
  getInstanceTransferCol,

  getResourceCol,
};
