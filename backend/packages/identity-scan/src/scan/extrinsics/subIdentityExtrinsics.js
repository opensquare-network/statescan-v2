const { getIdentityStorage } = require("../utils/getIdentityStorage");
const {
  getSubIdentitiesCollection,
  getIdentityTimelineCollection,
} = require("@statescan/mongo/src/identity");
const {
  getCurrentBlockTimestamp,
  hexToString,
} = require("../utils/unitConversion");

async function handleSubIdentityExtrinsicsV2(
  author,
  extrinsicData,
  indexer,
  method,
) {
  console.log(
    `handleSubIdentityExtrinsicsV2:::::::extrinsicData`,
    JSON.stringify(extrinsicData),
  );
  const parentIdentityAccountId = author.toString();
  const parentIdentity = await getIdentityStorage(parentIdentityAccountId);
  const timestamp = await getCurrentBlockTimestamp(indexer);
  let subIdentityList = [];

  if (extrinsicData.sub && extrinsicData.data) {
    let subAccountId = extrinsicData.sub.id;
    let data = extrinsicData.data;
    console.log(`sub`, subAccountId);
    const subIdentity = processSubIdentity(
      subAccountId,
      data,
      parentIdentity,
      method,
      timestamp,
    );
    subIdentityList.push(subIdentity);
  }

  if (extrinsicData?.subs) {
    let subs = extrinsicData.subs;
    subs.forEach(([subAccountId, data]) => {
      const subIdentity = processSubIdentity(
        subAccountId,
        data,
        parentIdentity,
        method,
        timestamp,
      );
      subIdentityList.push(subIdentity);
    });
  }

  await bulkUpdateSubIdentities(subIdentityList, parentIdentityAccountId);
  await bulkInsertIdentityTimeline(
    subIdentityList,
    parentIdentityAccountId,
    indexer,
  );
}

function processSubIdentity(
  subAccountId,
  data,
  parentIdentity,
  method,
  timestamp,
) {
  console.log(`subAccountId`, subAccountId);
  const hex = data.raw;
  const subDisplay = hexToString(hex);
  console.log(`subDisplay`, subDisplay);
  let subIdentity = JSON.parse(JSON.stringify(parentIdentity));
  subIdentity.requestTimestamp = timestamp;
  subIdentity.accountId = subAccountId;
  subIdentity.subIdentityAccountId = subAccountId;
  subIdentity.method = method;
  subIdentity.info.display = subDisplay;
  return subIdentity;
}

async function handleSubIdentityExtrinsics(extrinsic, indexer, method) {
  const parentIdentityAccountId = extrinsic.signer.toString();
  const parentIdentity = await getIdentityStorage(parentIdentityAccountId);
  const timestamp = await getCurrentBlockTimestamp(indexer);

  let subIdentityList = [];
  const extrinsicData = extrinsic.method.args[0];
  extrinsicData.forEach(([subAccountId, subDisplay]) => {
    let subIdentity = JSON.parse(JSON.stringify(parentIdentity));
    subIdentity.requestTimestamp = timestamp;
    subIdentity.accountId = subAccountId.toHuman();
    subIdentity.subIdentityAccountId = subAccountId.toHuman();
    subIdentity.method = method;
    subIdentity.info.display = subDisplay.asRaw.toUtf8();
    subIdentityList.push(subIdentity);
  });
  console.log(`subIdentityList`, subIdentityList);

  await bulkUpdateSubIdentities(subIdentityList, parentIdentityAccountId);
  await bulkInsertIdentityTimeline(
    subIdentityList,
    parentIdentityAccountId,
    indexer,
  );
}

async function bulkUpdateSubIdentities(
  subIdentityList,
  parentIdentityAccountId,
) {
  const subIdentityCollection = await getSubIdentitiesCollection();

  const operations = subIdentityList.map((subIdentity) => ({
    updateOne: {
      filter: { _id: subIdentity.accountId },
      update: {
        $set: {
          ...subIdentity,
          parentIdentityAccountId: parentIdentityAccountId,
        },
      },
      upsert: true,
    },
  }));

  await subIdentityCollection.bulkWrite(operations);
}

async function bulkInsertIdentityTimeline(
  identityEvents,
  parentAccountId,
  indexer,
) {
  const collection = await getIdentityTimelineCollection();

  //overwrite accountId with parentAccountId because we use parentAccountId as _id in identityTimeline collection
  const eventsWithIndexer = identityEvents.map((event) => ({
    ...event,
    accountId: parentAccountId,
    indexer,
  }));
  await collection.insertMany(eventsWithIndexer);
}

module.exports = {
  handleSubIdentityExtrinsics,
  handleSubIdentityExtrinsicsV2,
};
