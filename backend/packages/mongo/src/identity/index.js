const {
  mongo: { ScanDb },
  env: { getEnvOrThrow },
} = require("@osn/scan-common");

let db = null;
let identityCol = null;
let identityTimelineCol = null;
let registrarsCollection = null;
let registrarsTimelineCollection = null;
let subIdentitiesCol = null;

async function initIdentityScanDb() {
  db = new ScanDb(
    getEnvOrThrow("MONGO_IDENTITY_SCAN_URL"),
    getEnvOrThrow("MONGO_IDENTITY_SCAN_NAME"),
  );
  await db.init();

  identityCol = await db.createCol("identity");
  identityTimelineCol = await db.createCol("identityTimeline");
  subIdentitiesCol = await db.createCol("subIdentities");
  registrarsCollection = await db.createCol("registrars");
  registrarsTimelineCollection = await db.createCol("registrarsTimeline");
  _createIndexes().then(() => console.log("DB indexes created!"));
}

async function _createIndexes() {
  if (!db) {
    console.error("Please call initDb first");
    process.exit(1);
  }

  // _id set to accountId as index
  const identityCollection = await getIdentityCollection();
  await identityCollection.createIndex({ "info.display": 1 });

  const identityTimelineCollection = await getIdentityTimelineCol();
  await identityTimelineCollection.createIndex({ account: 1 });

  const subIdentitiesCollection = await getSubIdentitiesCollection();
  await subIdentitiesCollection.createIndex({ parentIdentityAccountId: 1 });

  // _id set to accountId as index
  const registrarsCollection = await getRegistrarsCollection();
  await registrarsCollection.createIndex({ accountId: 1 });

  const registrarsTimelineCollection = await getRegistrarsTimelineCollection();
  await registrarsTimelineCollection.createIndex({ registrarIndex: 1 });
  await registrarsTimelineCollection.createIndex({ requestingAccountId: 1 });
}

async function makeSureInit(col) {
  if (!col) {
    await initIdentityScanDb();
  }
}

async function getIdentityCollection() {
  await makeSureInit(identityCol);
  return identityCol;
}

async function getIdentityTimelineCol() {
  await makeSureInit(identityTimelineCol);
  return identityTimelineCol;
}

async function getSubIdentitiesCollection() {
  await makeSureInit(subIdentitiesCol);
  return subIdentitiesCol;
}

async function getRegistrarsCollection() {
  await makeSureInit(registrarsCollection);
  return registrarsCollection;
}

async function getRegistrarsTimelineCollection() {
  await makeSureInit(registrarsTimelineCollection);
  return registrarsTimelineCollection;
}

async function getIdentityDb() {
  if (!db) {
    await initIdentityScanDb();
  }

  return db;
}

async function dropIdentityCollection() {
  const identityCollection = await getIdentityCollection();
  identityCollection.drop();
  const identityTimelineCollection = await getIdentityTimelineCol();
  identityTimelineCollection.drop();
  const subIdentitiesCollection = await getSubIdentitiesCollection();
  subIdentitiesCollection.drop();
  const registrarsCollection = await getRegistrarsCollection();
  registrarsCollection.drop();
  const registrarsTimelineCollection = await getRegistrarsTimelineCollection();
  registrarsTimelineCollection.drop();
  await initIdentityScanDb();
}

module.exports = {
  initIdentityScanDb,
  getIdentityDb,
  getIdentityCollection,
  getIdentityTimelineCol,
  getRegistrarsCollection,
  getRegistrarsTimelineCollection,
  getSubIdentitiesCollection,
  dropIdentityCollectionAndInit: dropIdentityCollection,
};
