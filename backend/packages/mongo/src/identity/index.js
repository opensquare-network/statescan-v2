const {
  mongo: { ScanDb },
  env: { getEnvOrThrow },
} = require("@osn/scan-common");

let db = null;
let identityCol = null;
let identityTimelineCol = null;
let registrarsCollection  = null;
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

  //index for identity display name
  const identityCollection = await getIdentityCol();
  await identityCollection.createIndex({ 'info.display': 1 });

  const registrarsCollection =  await  getRegistrarsCollection()
  await registrarsCollection.createIndex({ 'accountId': 1 });

  const subIdentitiesCollection =  await  getSubIdentitiesCol()
  await subIdentitiesCollection.createIndex({ 'parentIdentityAccountId': 1 });

  const registrarsTimelineCollection =  await  getRegistrarsTimelineCollection()
  await registrarsTimelineCollection.createIndex({ 'registrarIndex': 1 });
  await registrarsTimelineCollection.createIndex({ 'requestingAccountId': 1 });
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

async function getSubIdentitiesCol() {
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

module.exports = {
  initIdentityScanDb,
  getIdentityDb,
  getIdentityCol,
  getIdentityTimelineCol,
  getRegistrarsCollection,
  getRegistrarsTimelineCollection,
  getSubIdentitiesCol
};
