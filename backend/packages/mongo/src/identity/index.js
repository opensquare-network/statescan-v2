const {
  mongo: { ScanDb },
  env: { getEnvOrThrow },
} = require("@osn/scan-common");

let db = null;
let identityCol = null;
let identityTimelineCol = null;
let registrarsCol = null;
let registrarsTimelineCollection = null;
let registrarStatCol = null;
let requestCol = null; // for judgement request
let requestTimelineCol = null;

async function initIdentityScanDb() {
  db = new ScanDb(
    getEnvOrThrow("MONGO_IDENTITY_SCAN_URL"),
    getEnvOrThrow("MONGO_IDENTITY_SCAN_NAME"),
  );
  await db.init();

  identityCol = await db.createCol("identity");
  identityTimelineCol = await db.createCol("identityTimeline");
  registrarsCol = await db.createCol("registrars");
  registrarsTimelineCollection = await db.createCol("registrarsTimeline");
  registrarStatCol = await db.createCol("registrarStat");
  requestCol = await db.createCol("request");
  requestTimelineCol = await db.createCol("requestTimeline");
  _createIndexes().then(() => console.log("DB indexes created!"));
}

async function _createIndexes() {
  if (!db) {
    console.error("Please call initDb first");
    process.exit(1);
  }

  // _id set to accountId as index
  const identityCollection = await getIdentityCol();
  await identityCollection.createIndex({ account: 1 });
  await identityCollection.createIndex({ display: 1 });
  await identityCollection.createIndex({ fullDisplay: 1 });
  await identityCollection.createIndex({ "lastUpdate.blockHeight": -1 });

  const identityTimelineCollection = await getIdentityTimelineCol();
  await identityTimelineCollection.createIndex({ account: 1 });

  // _id set to accountId as index
  const registrarsCollection = await getRegistrarsCol();
  await registrarsCollection.createIndex({ accountId: 1 });

  const registrarsTimelineCollection = await getRegistrarsTimelineCol();
  await registrarsTimelineCollection.createIndex({ registrarIndex: 1 });
  await registrarsTimelineCollection.createIndex({ requestingAccountId: 1 });

  await requestCol.createIndex({ account: 1 });
  await requestCol.createIndex({ registrarIndex: 1 });
}

async function makeSureInit(col) {
  if (!col) {
    await initIdentityScanDb();
  }
}

async function getIdentityCol() {
  await makeSureInit(identityCol);
  return identityCol;
}

async function getIdentityTimelineCol() {
  await makeSureInit(identityTimelineCol);
  return identityTimelineCol;
}

async function getRegistrarsCol() {
  await makeSureInit(registrarsCol);
  return registrarsCol;
}

async function getRegistrarsTimelineCol() {
  await makeSureInit(registrarsTimelineCollection);
  return registrarsTimelineCollection;
}

async function getRegistrarStatCol() {
  await makeSureInit(registrarStatCol);
  return registrarStatCol;
}

async function getRequestCol() {
  await makeSureInit(requestCol);
  return requestCol;
}

async function getRequestTimelineCol() {
  await makeSureInit(requestTimelineCol);
  return requestTimelineCol;
}

async function getIdentityDb() {
  if (!db) {
    await initIdentityScanDb();
  }

  return db;
}

module.exports = {
  initIdentityScanDb,
  getIdentityDb,
  getIdentityCol,
  getIdentityTimelineCol,
  getRegistrarsCol,
  getRegistrarsTimelineCol,
  getRegistrarStatCol,
  getRequestCol,
  getRequestTimelineCol,
};
